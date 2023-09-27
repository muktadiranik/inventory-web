import {
  GET_LANGUAGE_LIST_REQUEST,
  GET_LANGUAGE_LIST_SUCCESS,
  GET_LANGUAGE_LIST_FAILED,
} from "../constant/languageConstants";
import axios from "axios";
import { API_URL } from "./API_URL";

export const getLanguageListAction = () => async (dispatch) => {
  dispatch({ type: GET_LANGUAGE_LIST_REQUEST });
  axios
    .get(`${API_URL}/api/languages/`)
    .then((response) => {
      return response.data;
    })
    .then((data) => {
      dispatch({ type: GET_LANGUAGE_LIST_SUCCESS, payload: data });
    })
    .catch((error) => {
      dispatch({ type: GET_LANGUAGE_LIST_FAILED, payload: error });
    });
};
