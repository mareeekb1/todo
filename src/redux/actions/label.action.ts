import axios from "axios";
import { Dispatch } from "redux";
import { api } from "../../utils/appUtils";
import { Label } from "../models/labels.model";
import { Action, ActionType } from "./action.types";

const fetchLabels = () => (dispatch: Dispatch<Action>) => {
  axios
    .get(api.labels)
    .then((response) => {
      dispatch({
        type: ActionType.GET_LABELS,
        payload: {
          data: response.data,
          isLoading: false,
          error: null,
        },
      });
    })
    .catch((error) =>
      dispatch({
        type: ActionType.GET_LABELS,
        payload: {
          data: [],
          isLoading: false,
          error: error.message,
        },
      })
    );
};
const getLabelById =
  (id: number | string) => async (dispatch: Dispatch<Action>) => {
    let result = null;
    await axios
      .get(api.labels + "/?id=" + id)
      .then((response) => {
        dispatch({
          type: ActionType.GET_LABEL_BY_ID,
          payload: response.data[0],
        });
        result = response.data[0];
      })
      .catch((error) => console.log(error));
    return result;
  };

const deleteLabel =
  (id: number | string | undefined) => async (dispatch: Dispatch<Action>) => {
    let result = null;
    if (!id) return;
    await axios
      .delete(api.labels + "/" + id)
      .then((response) => {
        dispatch({
          type: ActionType.DELETE_LABEL_BY_ID,
          payload: id,
        });
        result = response.data[0];
      })
      .catch((error) => console.log(error));
    fetchLabels();
    return result;
  };
const addLabel = (label: Label) => async (dispatch: Dispatch<Action>) => {
  await axios
    .post(api.labels, label)
    .then((response) => {
      dispatch({
        type: ActionType.ADD_LABEL,
        payload: response.data,
      });
    })
    .catch((error) => console.log(error));
  fetchLabels();
};
const updateLabel = (label: Label) => async (dispatch: Dispatch<Action>) => {
  let result = null;
  await axios
    .put(api.labels + "/" + label.id, label)
    .then((response) => {
      dispatch({
        type: ActionType.UPDATE_LABEL,
      });
      result = response.data[0];
    })
    .catch((error) => console.log(error));
  return result;
};

export { fetchLabels, getLabelById, deleteLabel, addLabel, updateLabel };
