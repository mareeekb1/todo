import { Label } from "./labels.model";
import { Milestone } from "./milestones.model";
import { Todos, TodosList } from "./todos.model";

export interface DataModel {
  id?: number | string;
}
export interface Reducer {
  isLoading: boolean;
  error: null | string;
}
export interface LabelReducer extends Reducer {
  data: Label[];
}
export interface TodoReducer extends Reducer {
  data: TodosList[];
}
export interface MilestoneReducer extends Reducer {
  data: Milestone[];
}
export interface TodoItemsReducer extends Reducer {
  data: Todos[];
}
