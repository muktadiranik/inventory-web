import {
  GET_SUPPLIER_LIST_REQUEST,
  GET_SUPPLIER_LIST_SUCCESS,
  GET_SUPPLIER_LIST_FAILED,
  ADD_SUPPLIER_REQUEST,
  ADD_SUPPLIER_SUCCESS,
  ADD_SUPPLIER_FAILED,
} from "../constant/supplierConstants";
import axios from "axios";
import { API_URL } from "./API_URL";

export const getSupplierListAction = (companyId) => async (dispatch) => {
  dispatch({ type: GET_SUPPLIER_LIST_REQUEST });
  axios
    .get(`${API_URL}/api/companies/${companyId}/suppliers/`, {
      headers: {
        Authorization: `token ${localStorage.getItem("key")}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .then((data) => {
      dispatch({ type: GET_SUPPLIER_LIST_SUCCESS, payload: data });
    })
    .catch((error) => {
      dispatch({ type: GET_SUPPLIER_LIST_FAILED, payload: error });
    });
};

export const addSupplierAction = (companyId, supplier) => async (dispatch) => {
  dispatch({ type: ADD_SUPPLIER_REQUEST });
  axios
    .post(`${API_URL}/api/companies/${companyId}/suppliers/`, supplier, {
      headers: {
        Authorization: `token ${localStorage.getItem("key")}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .then((data) => {
      dispatch({ type: ADD_SUPPLIER_SUCCESS, payload: data });
    })
    .catch((error) => {
      dispatch({ type: ADD_SUPPLIER_FAILED, payload: error });
    });
};
