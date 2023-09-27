import {
  GET_PLAN_LIST_REQUEST,
  GET_PLAN_LIST_SUCCESS,
  GET_PLAN_LIST_FAILED,
} from "../constant/planConstants";

export const planReducer = (state = { planList: [] }, action) => {
  switch (action.type) {
    case GET_PLAN_LIST_REQUEST:
      return { isLoading: true };
    case GET_PLAN_LIST_SUCCESS:
      return { isLoading: false, planList: action.payload };
    case GET_PLAN_LIST_FAILED:
      return { isLoading: false, error: action.payload };

    default:
      return state;
  }
};
