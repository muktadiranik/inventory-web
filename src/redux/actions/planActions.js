import axios from "axios";
import {
  GET_PLAN_LIST_REQUEST,
  GET_PLAN_LIST_SUCCESS,
  GET_PLAN_LIST_FAILED,
} from "../constant/planConstants";
import { API_URL } from "./API_URL";

export const getPlanListAction = () => async (dispatch) => {
  dispatch({ type: GET_PLAN_LIST_REQUEST });
  axios
    .get(`${API_URL}/api/plans/`)
    .then((response) => {
      return response.data;
    })
    .then((data) => {
      dispatch({ type: GET_PLAN_LIST_SUCCESS, payload: data });
    })
    .catch((error) => {
      dispatch({ type: GET_PLAN_LIST_FAILED, payload: error });
    });
};
