import { ActionType } from "../actions/action.types";
import { LabelReducer } from "../models";

const initialState: LabelReducer = {
  data: [],
  isLoading: true,
  error: null,
};

const labelReducer = (
  state = initialState,
  action: { type: any; payload: any }
) => {
  switch (action.type) {
    case ActionType.GET_LABELS:
      return action.payload;
    case ActionType.GET_LABEL_BY_ID:
      return;
    case ActionType.DELETE_LABEL_BY_ID:
      return {
        ...state,
        data: state.data.filter((x) => x.id !== action.payload),
        isLoading: true,
      };
    case ActionType.ADD_LABEL:
      return action.payload;
    case ActionType.UPDATE_LABEL:
      return;
    default:
      return state;
  }
};

export default labelReducer;
