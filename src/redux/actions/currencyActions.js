import {
  GET_CURRENCY_LIST_REQUEST,
  GET_CURRENCY_LIST_SUCCESS,
  GET_CURRENCY_LIST_FAILED,
} from "../constant/currencyLanguageConstants";
import axios from "axios";
import { API_URL } from "./API_URL";

export const getCurrencyListAction = () => async (dispatch) => {
  dispatch({ type: GET_CURRENCY_LIST_REQUEST });
  axios
    .get(`${API_URL}/api/currencies/`)
    .then((response) => {
      return response.data;
    })
    .then((data) => {
      dispatch({ type: GET_CURRENCY_LIST_SUCCESS, payload: data });
    })
    .catch((error) => {
      dispatch({ type: GET_CURRENCY_LIST_FAILED, payload: error });
    });
};
