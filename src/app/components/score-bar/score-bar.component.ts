import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from 'src/app/state/app.state';
import { GameCoreState } from '../game-core/state/game-core.reducer';
import { maxScore, selectScore } from '../game-core/state/game-core.selectors';

@Component({
  selector: 'app-score-bar',
  templateUrl: './score-bar.component.html',
  styleUrls: ['./score-bar.component.scss'],
})
export class ScoreBarComponent implements OnInit {
  constructor(private store: Store<State>) {}

  score$!: Observable<number>;
  maxScore$!: Observable<number>;

  ngOnInit(): void {
    this.score$ = this.store.select(selectScore);
    this.maxScore$ = this.store.select(maxScore);
  }
}
