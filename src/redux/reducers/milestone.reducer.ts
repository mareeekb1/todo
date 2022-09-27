import { ActionType } from "../actions/action.types";
import { MilestoneReducer } from "../models";

const initialState: MilestoneReducer = {
  data: [],
  isLoading: true,
  error: null,
};

const milestoneReducer = (
  state = initialState,
  action: { type: any; payload: any }
) => {
  switch (action.type) {
    case ActionType.GET_MILESTONES:
      return action.payload;
    case ActionType.GET_MILESTONE_BY_ID:
      return;
    case ActionType.DELETE_MILESTONE_BY_ID:
      return;
    case ActionType.ADD_MILESTONE:
      return;
    case ActionType.UPDATE_MILESTONE:
      return;
    default:
      return state;
  }
};

export default milestoneReducer;
