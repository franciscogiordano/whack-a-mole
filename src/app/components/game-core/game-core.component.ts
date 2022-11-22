import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  BehaviorSubject,
  concatMap,
  defer,
  delay,
  delayWhen,
  filter,
  finalize,
  interval,
  map,
  Observable,
  of,
  scan,
  startWith,
  switchMap,
  take,
  tap,
  timer,
} from 'rxjs';
import { State } from 'src/app/state/app.state';
import { updateMaxScore, updateScore } from './state/game-core.actions';
import { selectScore } from './state/game-core.selectors';

export interface Mole {
  active: Observable<boolean>;
  whacked: BehaviorSubject<boolean>;
}

export enum ScoreCommands {
  DECREASE,
  INCREASE,
}

@Component({
  selector: 'app-game-core',
  templateUrl: './game-core.component.html',
  styleUrls: ['./game-core.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameCoreComponent implements OnInit {
  moles: Mole[] = [];
  score$!: Observable<number>;
  activeGame: boolean = false;
  gameDuration: Observable<number> = of(30);
  counterInitState: number = 29;
  buttonTxt: string = 'Start';

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.score$ = this.store.select(selectScore);
  }

  startGame() {
    this.resetScore();
    this.initMoles();
    this.gameDuration = this.getGameDuration();
    this.activeGame = true;
  }

  initMoles() {
    for (let i = 0; i < 6; i++) {
      this.moles.push({
        active: this.getStateChangeAction$(i),
        whacked: this.getWhackedSubject(),
      });
    }
  }

  hitMole(isMoleActive: boolean | null, moleIndex: number) {
    if (!isMoleActive) {
      return;
    }
    this.moles[moleIndex].whacked
      .pipe(
        take(1),
        filter((isWacked) => !isWacked),
        switchMap(() => {
          return this.updateStateScore(ScoreCommands.INCREASE);
        }),
        tap(() => this.moles[moleIndex].whacked.next(true))
      )
      .subscribe();
  }

  getInterval() {
    return interval(1000).pipe(
      map(() => this.getRandomNumber(1000, 3000)),
      concatMap((number) => timer(number))
    );
  }

  getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  getStateChangeAction$(index: number) {
    return this.getInterval().pipe(
      map((x) => {
        return !x;
      }),
      scan((prev) => !prev),
      switchMap((active) =>
        this.decreaseScore(active, index).pipe(
          map(() => {
            return active;
          })
        )
      ),
      tap(() => this.moles[index].whacked.next(false))
    );
  }

  decreaseScore(active: boolean, index: number) {
    return this.moles[index].whacked.pipe(
      take(1),
      switchMap((wasWhacked) => {
        if (!wasWhacked && !active) {
          return this.updateStateScore(ScoreCommands.DECREASE);
        }
        return of({});
      })
    );
  }

  updateStateScore(command: ScoreCommands) {
    return this.score$.pipe(
      take(1),
      tap((score) => {
        const updatedScore =
          command === ScoreCommands.INCREASE ? ++score : --score;
        this.store.dispatch(updateScore({ score: updatedScore }));
      })
    );
  }

  getWhackedSubject(): BehaviorSubject<boolean> {
    return new BehaviorSubject<boolean>(false);
  }

  getGameDuration() {
    return interval(1000).pipe(
      take(30),
      map((x) => {
        return this.counterInitState - x;
      }),
      startWith(30),
      finalize(() => this.endGame())
    );
  }

  endGame() {
    this.score$
      .pipe(take(1))
      .subscribe((value) =>
        this.store.dispatch(updateMaxScore({ score: value }))
      );

    this.activeGame = false;
    this.buttonTxt = 'Try again';
    this.moles = [];
  }

  resetScore() {
    this.store.dispatch(updateScore({ score: 0 }));
  }
}
