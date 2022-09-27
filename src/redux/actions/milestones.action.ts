import axios from "axios";
import { Dispatch } from "redux";
import { api } from "../../utils/appUtils";
import { Milestone } from "../models/milestones.model";
import { Action, ActionType } from "./action.types";

const fetchMilestones = () => (dispatch: Dispatch<Action>) => {
  axios
    .get(api.milestones)
    .then((response) => {
      dispatch({
        type: ActionType.GET_MILESTONES,
        payload: {
          data: response.data,
          isLoading: false,
          error: null,
        },
      });
    })
    .catch((error) =>
      dispatch({
        type: ActionType.GET_MILESTONES,
        payload: {
          data: [],
          isLoading: false,
          error: error.message,
        },
      })
    );
};
const getMilestoneById =
  (id: number | string) => async (dispatch: Dispatch<Action>) => {
    let result = null;
    await axios
      .get(api.milestones + "/?id=" + id)
      .then((response) => {
        dispatch({
          type: ActionType.GET_MILESTONE_BY_ID,
          payload: response.data[0],
        });
        result = response.data[0];
      })
      .catch((error) => console.log(error));
    return result;
  };

const deleteMilestone =
  (id: number | string | undefined) => async (dispatch: Dispatch<Action>) => {
    let result = null;
    await axios
      .delete(api.milestones + "/" + id)
      .then((response) => {
        dispatch({
          type: ActionType.DELETE_MILESTONE_BY_ID,
          payload: id,
        });
        result = response.data[0];
      })
      .catch((error) => console.log(error));
    return result;
  };
const addMilestone =
  (milestone: Milestone) => async (dispatch: Dispatch<Action>) => {
    let result = null;
    await axios
      .post(api.milestones, milestone)
      .then((response) => {
        dispatch({
          type: ActionType.ADD_MILESTONE,
        });
        result = response.data[0];
      })
      .catch((error) => console.log(error));
    return result;
  };
const updateMilestone =
  (milestone: Milestone) => async (dispatch: Dispatch<Action>) => {
    let result = null;
    await axios
      .put(api.milestones + "/" + milestone.id, milestone)
      .then((response) => {
        dispatch({
          type: ActionType.UPDATE_MILESTONE,
        });
        result = response.data[0];
      })
      .catch((error) => console.log(error));
    return result;
  };

export {
  fetchMilestones,
  getMilestoneById,
  deleteMilestone,
  addMilestone,
  updateMilestone,
};
