import {
  LabelReducer,
  MilestoneReducer,
  TodoItemsReducer,
  TodoReducer,
} from "../models";
import { Label } from "../models/labels.model";
import { Milestone } from "../models/milestones.model";
import { Todos } from "../models/todos.model";

export enum ActionType {
  GET_LABELS = "GET_LABELS",
  GET_LABEL_BY_ID = "GET_LABEL_BY_ID",
  ADD_LABEL = "ADD_LABEL",
  DELETE_LABEL_BY_ID = "DELETE_LABEL_BY_ID",
  UPDATE_LABEL = "UPDATE_LABEL",

  GET_MILESTONES = "GET_MILESTONES",
  GET_MILESTONE_BY_ID = "GET_MILESTONE_BY_ID",
  ADD_MILESTONE = "ADD_MILESTONE",
  DELETE_MILESTONE_BY_ID = "DELETE_MILESTONE_BY_ID",
  UPDATE_MILESTONE = "UPDATE_MILESTONE",

  GET_TODO_ITEMS = "GET_TODO_ITEMS",
  GET_TODO_ITEM_BY_ID = "GET_TODO_ITEM_BY_ID",
  ADD_TODO_ITEM = "ADD_TODO_ITEM",
  DELETE_TODO_ITEM_BY_ID = "DELETE_TODO_ITEM_BY_ID",
  UPDATE_TODO_ITEM = "UPDATE_TODO_ITEM",

  GET_TODO_LISTS = "GET_TODO_LISTS",
  GET_TODO_LIST_BY_ID = "GET_TODO_LIST_BY_ID",
  ADD_TODO_LIST = "ADD_TODO_LIST",
  DELETE_TODO_LIST_BY_ID = "DELETE_TODO_LIST_BY_ID",
  UPDATE_TODO_LIST = "UPDATE_TODO_LIST",
}

interface GetLabelsAction {
  type: ActionType.GET_LABELS;
  payload: LabelReducer;
}
interface GetLabelByIdAction {
  type: ActionType.GET_LABEL_BY_ID;
  payload: Label;
}
interface AddLabelAction {
  type: ActionType.ADD_LABEL;
}
interface DeleteLabelAction {
  type: ActionType.DELETE_LABEL_BY_ID;
  payload: string | number | undefined;
}
interface UpdateLabelAction {
  type: ActionType.UPDATE_LABEL;
}

interface GetMilestonesAction {
  type: ActionType.GET_MILESTONES;
  payload: MilestoneReducer;
}
interface GetMilestoneByIdAction {
  type: ActionType.GET_MILESTONE_BY_ID;
  payload: Milestone;
}
interface AddMilestoneAction {
  type: ActionType.ADD_MILESTONE;
}
interface DeleteMilestoneAction {
  type: ActionType.DELETE_MILESTONE_BY_ID;
  payload: string | number | undefined;
}
interface UpdateMilestoneAction {
  type: ActionType.UPDATE_MILESTONE;
}

interface GetTodoItemsAction {
  type: ActionType.GET_TODO_ITEMS;
  payload: TodoItemsReducer;
}
interface GetTodoItemByIdAction {
  type: ActionType.GET_TODO_ITEM_BY_ID;
  payload: Todos;
}
interface AddTodoItemAction {
  type: ActionType.ADD_TODO_ITEM;
}
interface DeleteTodoItemAction {
  type: ActionType.DELETE_TODO_ITEM_BY_ID;
  payload: string | number | undefined;
}
interface UpdateTodoItemAction {
  type: ActionType.UPDATE_TODO_ITEM;
}

interface GetTodosAction {
  type: ActionType.GET_TODO_LISTS;
  payload: TodoReducer;
}
interface GetTodoByIdAction {
  type: ActionType.GET_TODO_LIST_BY_ID;
  payload: Todos;
}
interface AddTodoAction {
  type: ActionType.ADD_TODO_LIST;
}
interface DeleteTodoAction {
  type: ActionType.DELETE_TODO_LIST_BY_ID;
  payload: string | number | undefined;
}
interface UpdateTodoAction {
  type: ActionType.UPDATE_TODO_LIST;
}

export type Action =
  | GetLabelsAction
  | GetLabelByIdAction
  | AddLabelAction
  | DeleteLabelAction
  | UpdateLabelAction
  | GetMilestonesAction
  | GetMilestoneByIdAction
  | AddMilestoneAction
  | DeleteMilestoneAction
  | UpdateMilestoneAction
  | GetTodoItemsAction
  | GetTodoItemByIdAction
  | AddTodoItemAction
  | DeleteTodoItemAction
  | UpdateTodoItemAction
  | GetTodosAction
  | GetTodoByIdAction
  | AddTodoAction
  | DeleteTodoAction
  | UpdateTodoAction;
