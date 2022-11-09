import { createAction, props } from '@ngrx/store';

export const updateScore = createAction(
  '[Game Core] Update  score',
  props<{ score: number }>()
);
