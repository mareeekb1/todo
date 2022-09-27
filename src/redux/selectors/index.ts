import { RootState } from "../store";

export const selecLabel = (state: RootState) => state.label;
export const selectMilestone = (state: RootState) => state.milestone;
export const selectTodo = (state: RootState) => state.todo;
