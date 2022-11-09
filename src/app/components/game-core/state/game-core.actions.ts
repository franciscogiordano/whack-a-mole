import { createAction, props } from '@ngrx/store';

export const updateScore = createAction(
  '[Game Core] Update  score',
  props<{ score: number }>()
);

export const updateMaxScore = createAction(
  '[Game Core] Update max score',
  props<{ score: number }>()
);
