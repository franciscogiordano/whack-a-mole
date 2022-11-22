import { createReducer, on } from '@ngrx/store';
import { updateMaxScore, updateScore } from './game-core.actions';

export interface GameCoreState {
  score: number;
  maxScore: number | null;
}

export const initialState: GameCoreState = {
  score: 0,
  maxScore: null,
};

export const gameCoreReducer = createReducer<GameCoreState>(
  initialState,
  on(updateScore, (state, action): GameCoreState => {
    return {
      ...state,
      score: action.score,
    };
  }),
  on(updateMaxScore, (state, action): GameCoreState => {
    if (state.maxScore && state.maxScore >= action.score) {
      return state;
    }
    return {
      ...state,
      maxScore: action.score,
    };
  })
);
