import { createSelector } from '@ngrx/store';
import { State } from 'src/app/state/app.state';
import { GameCoreState } from './game-core.reducer';

export const selectGameCore = (state: State) => state?.gameCore;

export const selectScore = createSelector(
  selectGameCore,
  (state: GameCoreState) => state?.score
);

export const maxScore = createSelector(
  selectGameCore,
  (state: GameCoreState) => state?.maxScore
);
