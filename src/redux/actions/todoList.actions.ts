import axios from "axios";
import { Dispatch } from "redux";
import { api } from "../../utils/appUtils";
import { Label } from "../models/labels.model";
import { Todos, TodosList } from "../models/todos.model";
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
  (id: number | string) => (dispatch: Dispatch<Action>) => {
    let result = null;
    axios
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
  (id: number | string) => (dispatch: Dispatch<Action>) => {
    let result = null;
    axios
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
const addTodoList = (title: string) => (dispatch: Dispatch<Action>) => {
  return new Promise<TodosList>((resolve, reject) => {
    axios
      .post(api.todoList, {
        title: title,
        isActive: true,
        milestone: null,
      })
      .then((response) => {
        console.log(response);
        dispatch({
          type: ActionType.ADD_TODO_LIST,
          payload: {
            data: response.data,
            isLoading: false,
            error: null,
          },
        });
        resolve(response.data);
      })
      .catch((error) => reject(error));
  });
};
const updateTodoList =
  (todoList: TodosList) => (dispatch: Dispatch<Action>) => {
    let result = null;
    axios
      .put(api.todoList + "/" + todoList.id, todoList)
      .then((response) => {
        result = response.data[0];
        dispatch({
          type: ActionType.UPDATE_TODO_LIST,
        });
      })
      .catch((error) => console.log(error));
    return result;
  };
const addTodoItemToList =
  (item: Todos, list: TodosList) => (dispatch: Dispatch<Action>) => {
    return new Promise((resolve, reject) => {
      axios
        .post(api.todoItem, {
          title: item.title,
          description: item.description,
          deadline: item.deadline,
          isDone: false,
        })
        .then((response) =>
          axios
            .put(api.todoList + "/" + list.id, {
              ...list,
              items: list.items?.concat(response.data),
            })
            .then((resp) => {
              dispatch({
                type: ActionType.ADD_TODO_ITEM_TO_LIST,
                payload: {
                  data: resp.data,
                  isLoading: false,
                  error: null,
                },
              });
              resolve(resp.data);
            })
            .catch((err) => reject(err))
        )
        .catch((error) => console.log(error));
    });
  };
const deleteTodoItemFromList =
  (id: string | number, list: TodosList) =>
  async (dispatch: Dispatch<Action>) => {
    return new Promise((resolve, reject) => {
      axios
        .delete(api.todoItem + "/" + id)
        .then((response) =>
          axios
            .put(api.todoList + "/" + list.id, {
              ...list,
              items: list.items?.filter((x) => x.id !== response.data.id),
            })
            .then((resp) => {
              dispatch({
                type: ActionType.DELETE_TODO_ITEM_FROM_LIST,
                payload: {
                  data: resp.data,
                  isLoading: false,
                  error: null,
                },
              });
              resolve(resp.data);
            })
            .catch((err) => reject(err))
        )
        .catch((error) => console.log(error));
    });
  };
const handleTodoItemActivity =
  (item: Todos, list: TodosList) => async (dispatch: Dispatch<Action>) => {
    return new Promise((resolve, reject) => {
      axios
        .put(api.todoItem + "/" + item.id, {
          ...item,
          isDone: !item.isDone,
        })
        .then((response) => {
          let array = list.items?.map((x) => {
            if (x.id === response.data.id) x = response.data;
            return x;
          });
          axios
            .put(api.todoList + "/" + list.id, {
              ...list,
              items: array,
            })
            .then((resp) => {
              dispatch({
                type: ActionType.CHECK_TODO_ITEM_IN_LIST,
                payload: {
                  data: resp.data,
                  isLoading: false,
                  error: null,
                },
              });
              resolve(resp.data);
            })
            .catch((err) => reject(err));
        })
        .catch((error) => console.log(error));
    });
  };
const handleLabelsInTodoList =
  (list: TodosList, labels: Label[]) => async (dispatch: Dispatch<Action>) => {
    return new Promise((resolve, reject) => {
      axios
        .put(api.todoList + "/" + list.id, {
          ...list,
          labels: labels,
        })
        .then((response) => {
          dispatch({
            type: ActionType.HANDLE_LABEL_IN_TODO_LIST,
            payload: {
              data: response.data,
              isLoading: false,
              error: null,
            },
          });
          resolve(response.data);
        })
        .catch((err) => reject(err));
    });
  };
const handleActiveTodoList =
  (list: TodosList) => async (dispatch: Dispatch<Action>) => {
    return new Promise((resolve, reject) => {
      axios
        .put(api.todoList + "/" + list.id, {
          ...list,
          isActive: !list.isActive,
        })
        .then((response) => {
          dispatch({
            type: ActionType.HANDLE_TODO_LIST_ACTIVE,
            payload: {
              data: response.data,
              isLoading: false,
              error: null,
            },
          });
          resolve(response.data);
        })
        .catch((err) => reject(err));
    });
  };

export {
  fetchTodoLists,
  getTodoListById,
  deleteTodoList,
  addTodoList,
  updateTodoList,
  addTodoItemToList,
  deleteTodoItemFromList,
  handleTodoItemActivity,
  handleLabelsInTodoList,
  handleActiveTodoList,
};
