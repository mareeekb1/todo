import { configureStore, combineReducers } from "@reduxjs/toolkit";
import labelReducer from "./reducers/label.reducer";
import milestoneReducer from "./reducers/milestone.reducer";
import todoReducer from "./reducers/todo.reducer";

const rootReducer = combineReducers({
  label: labelReducer,
  milestone: milestoneReducer,
  todo: todoReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
