import { DataModel } from ".";
import { Label } from "./labels.model";
import { Milestone } from "./milestones.model";

export interface Todos extends DataModel {
  title: string;
  description: string;
  deadline: string;
  isDone: boolean;
}
export interface TodosList extends DataModel {
  items?: Todos[];
  title: string;
  labels?: Label[];
  milestone?: Milestone | null;
  isActive: boolean;
}
export interface TodoDataList {
  data: TodosList[];
}
