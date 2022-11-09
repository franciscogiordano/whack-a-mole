import { createReducer, on } from '@ngrx/store';
import { updateScore } from './game-core.actions';

export interface GameCoreState {
  score: number;
}

export const initialState: GameCoreState = {
  score: 0,
};

export const gameCoreReducer = createReducer<GameCoreState>(
  initialState,
  on(
    updateScore,
    (state, action): GameCoreState => ({
      ...state,
      score: action.score,
    })
  )
);
