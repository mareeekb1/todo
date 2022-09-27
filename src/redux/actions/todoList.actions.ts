import axios from "axios";
import { Dispatch } from "redux";
import { api } from "../../utils/appUtils";
import { TodosList } from "../models/todos.model";
import { Action, ActionType } from "./action.types";

const fetchTodoLists = () => (dispatch: Dispatch<Action>) => {
  axios
    .get(api.todoList)
    .then((response) => {
      dispatch({
        type: ActionType.GET_TODO_LISTS,
        payload: {
          data: response.data,
          isLoading: false,
          error: null,
        },
      });
    })
    .catch((error) =>
      dispatch({
        type: ActionType.GET_TODO_LISTS,
        payload: {
          data: [],
          isLoading: false,
          error: error.message,
        },
      })
    );
};
const getTodoListById =
  (id: number | string) => async (dispatch: Dispatch<Action>) => {
    let result = null;
    await axios
      .get(api.todoList + "/?id=" + id)
      .then((response) => {
        dispatch({
          type: ActionType.GET_TODO_LIST_BY_ID,
          payload: response.data[0],
        });
        result = response.data[0];
      })
      .catch((error) => console.log(error));
    return result;
  };

const deleteTodoList =
  (id: number | string) => async (dispatch: Dispatch<Action>) => {
    let result = null;
    await axios
      .delete(api.todoList + "/" + id)
      .then((response) => {
        dispatch({
          type: ActionType.DELETE_TODO_LIST_BY_ID,
          payload: id,
        });
        result = response.data[0];
      })
      .catch((error) => console.log(error));
    return result;
  };
const addTodoList =
  (todoList: TodosList) => async (dispatch: Dispatch<Action>) => {
    let result = null;
    await axios
      .post(api.todoList, todoList)
      .then((response) => {
        dispatch({
          type: ActionType.ADD_TODO_LIST,
        });
        result = response.data[0];
      })
      .catch((error) => console.log(error));
    return result;
  };
const updateTodoList =
  (todoList: TodosList) => async (dispatch: Dispatch<Action>) => {
    let result = null;
    await axios
      .put(api.todoList + "/" + todoList.id, todoList)
      .then((response) => {
        dispatch({
          type: ActionType.UPDATE_TODO_LIST,
        });
        result = response.data[0];
      })
      .catch((error) => console.log(error));
    return result;
  };

export {
  fetchTodoLists,
  getTodoListById,
  deleteTodoList,
  addTodoList,
  updateTodoList,
};
