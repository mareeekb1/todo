import axios from "axios";
import { Dispatch } from "redux";
import { api } from "../../utils/appUtils";
import { Todos } from "../models/todos.model";
import { Action, ActionType } from "./action.types";

const fetchTodoItems = () => (dispatch: Dispatch<Action>) => {
  axios
    .get(api.todoItem)
    .then((response) => {
      dispatch({
        type: ActionType.GET_TODO_ITEMS,
        payload: {
          data: response.data,
          isLoading: false,
          error: null,
        },
      });
    })
    .catch((error) =>
      dispatch({
        type: ActionType.GET_TODO_ITEMS,
        payload: {
          data: [],
          isLoading: false,
          error: error.message,
        },
      })
    );
};
const getTodoItemById =
  (id: number | string) => async (dispatch: Dispatch<Action>) => {
    let result = null;
    await axios
      .get(api.todoItem + "/?id=" + id)
      .then((response) => {
        dispatch({
          type: ActionType.GET_TODO_ITEM_BY_ID,
          payload: response.data[0],
        });
        result = response.data[0];
      })
      .catch((error) => console.log(error));
    return result;
  };

const deleteTodoItem =
  (id: number | string) => async (dispatch: Dispatch<Action>) => {
    let result = null;
    await axios
      .delete(api.todoItem + "/" + id)
      .then((response) => {
        dispatch({
          type: ActionType.DELETE_TODO_ITEM_BY_ID,
          payload: id,
        });
        result = response.data[0];
      })
      .catch((error) => console.log(error));
    return result;
  };
const addTodoItem = (todo: Todos) => async (dispatch: Dispatch<Action>) => {
  let result = null;
  await axios
    .post(api.todoItem, todo)
    .then((response) => {
      dispatch({
        type: ActionType.ADD_TODO_ITEM,
      });
      result = response.data[0];
    })
    .catch((error) => console.log(error));
  return result;
};
const updateTodoItem = (todo: Todos) => async (dispatch: Dispatch<Action>) => {
  let result = null;
  await axios
    .put(api.todoItem + "/" + todo.id, todo)
    .then((response) => {
      dispatch({
        type: ActionType.UPDATE_TODO_ITEM,
      });
      result = response.data[0];
    })
    .catch((error) => console.log(error));
  return result;
};

export {
  fetchTodoItems,
  getTodoItemById,
  deleteTodoItem,
  addTodoItem,
  updateTodoItem,
};
