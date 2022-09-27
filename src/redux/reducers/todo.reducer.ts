import { ActionType } from "../actions/action.types";
import { TodoReducer } from "../models";

const initialState: TodoReducer = {
  data: [],
  isLoading: true,
  error: null,
};

const todoReducer = (
  state = initialState,
  action: { type: any; payload: any }
) => {
  switch (action.type) {
    case ActionType.GET_TODO_LISTS:
      return action.payload;
    case ActionType.GET_TODO_LIST_BY_ID:
      return;
    case ActionType.DELETE_TODO_LIST_BY_ID:
      return;
    case ActionType.ADD_TODO_LIST:
      return;
    case ActionType.UPDATE_TODO_LIST:
      return;
    case ActionType.GET_TODO_ITEMS:
      return;
    case ActionType.GET_TODO_ITEM_BY_ID:
      return;
    case ActionType.DELETE_TODO_ITEM_BY_ID:
      return;
    case ActionType.ADD_TODO_ITEM:
      return;
    case ActionType.UPDATE_TODO_ITEM:
      return;
    default:
      return state;
  }
};

export default todoReducer;
