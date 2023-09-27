import {
  GET_TRANSACTION_LIST_REQUEST,
  GET_TRANSACTION_LIST_SUCCESS,
  GET_TRANSACTION_LIST_FAILED,
  ADD_TRANSACTION_REQUEST,
  ADD_TRANSACTION_SUCCESS,
  ADD_TRANSACTION_FAILED,
  UPDATE_TRANSACTION_REQUEST,
  UPDATE_TRANSACTION_SUCCESS,
  UPDATE_TRANSACTION_FAILED,
  DELETE_TRANSACTION_REQUEST,
  DELETE_TRANSACTION_SUCCESS,
  DELETE_TRANSACTION_FAILED,
  GET_TOP_TRANSACTION_REQUEST,
  GET_TOP_TRANSACTION_SUCCESS,
  GET_TOP_TRANSACTION_FAILED,
} from "../constant/transactionConstants";
import axios from "axios";
import { API_URL } from "./API_URL";

export const getTransactionListAction =
  (companyId, token) => async (dispatch) => {
    dispatch({ type: GET_TRANSACTION_LIST_REQUEST });
    axios
      .get(`${API_URL}/api/companies/${companyId}/transactions/`, {
        headers: {
          Authorization: `token ${token}`,
        },
      })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        dispatch({ type: GET_TRANSACTION_LIST_SUCCESS, payload: data });
      })
      .catch((error) => {
        dispatch({ type: GET_TRANSACTION_LIST_FAILED, payload: error });
      });
  };

export const addTransactionAction =
  (companyId, token, transaction) => async (dispatch) => {
    dispatch({ type: ADD_TRANSACTION_REQUEST });
    axios
      .post(
        `${API_URL}/api/companies/${companyId}/transactions/`,
        transaction,
        {
          headers: {
            Authorization: `token ${token}`,
          },
        }
      )
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        dispatch({ type: ADD_TRANSACTION_SUCCESS, payload: data });
      })
      .catch((error) => {
        dispatch({ type: ADD_TRANSACTION_FAILED, payload: error });
      });
  };

export const updateTransactionAction =
  (companyId, token, transaction, transactionId) => async (dispatch) => {
    dispatch({ type: UPDATE_TRANSACTION_REQUEST });
    axios
      .put(
        `${API_URL}/api/companies/${companyId}/transactions/${transactionId}/`,
        transaction,
        {
          headers: {
            Authorization: `token ${token}`,
          },
        }
      )
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        dispatch({ type: UPDATE_TRANSACTION_SUCCESS, payload: data });
      })
      .catch((error) => {
        dispatch({ type: UPDATE_TRANSACTION_FAILED, payload: error });
      });
  };

export const deleteTransactionAction =
  (companyId, token, transactionId) => async (dispatch) => {
    dispatch({ type: DELETE_TRANSACTION_REQUEST });
    axios
      .delete(
        `${API_URL}/api/companies/${companyId}/transactions/${transactionId}/`,
        {
          headers: {
            Authorization: `token ${token}`,
          },
        }
      )
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        dispatch({ type: DELETE_TRANSACTION_SUCCESS, payload: data });
      })
      .catch((error) => {
        dispatch({ type: DELETE_TRANSACTION_FAILED, payload: error });
      });
  };

export const getTopTransactionAction =
  (companyId, token) => async (dispatch) => {
    dispatch({ type: GET_TOP_TRANSACTION_REQUEST });
    axios
      .get(`${API_URL}/api/companies/${companyId}/dashboard-transactions/`, {
        headers: {
          Authorization: `token ${token}`,
        },
      })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        dispatch({ type: GET_TOP_TRANSACTION_SUCCESS, payload: data });
      })
      .catch((error) => {
        dispatch({ type: GET_TOP_TRANSACTION_FAILED, payload: error });
      });
  };
