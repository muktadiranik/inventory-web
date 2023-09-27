import {
  GET_CSIB_LIST_REQUEST,
  GET_CSIB_LIST_SUCCESS,
  GET_CSIB_LIST_FAILED,
  GET_CSIB_TYPE_LIST_REQUEST,
  GET_CSIB_TYPE_LIST_SUCCESS,
  GET_CSIB_TYPE_LIST_FAILED,
  ADD_CSIB_REQUEST,
  ADD_CSIB_SUCCESS,
  ADD_CSIB_FAILED,
  GET_CSIB_LATEST_CUSTOMERS_REQUEST,
  GET_CSIB_LATEST_CUSTOMERS_SUCCESS,
  GET_CSIB_LATEST_CUSTOMERS_FAILED,
  GET_CSIB_LATEST_SUPPLIERS_SUCCESS,
  GET_CSIB_LATEST_SUPPLIERS_FAILED,
  GET_CSIB_LATEST_SUPPLIERS_REQUEST,
  GET_CSIB_LATEST_INVESTORS_REQUEST,
  GET_CSIB_LATEST_INVESTORS_SUCCESS,
  GET_CSIB_LATEST_INVESTORS_FAILED,
  GET_CSIB_LATEST_BORROWERS_REQUEST,
  GET_CSIB_LATEST_BORROWERS_SUCCESS,
  GET_CSIB_LATEST_BORROWERS_FAILED,
  DELETE_CSIB_REQUEST,
  DELETE_CSIB_SUCCESS,
  DELETE_CSIB_FAILED,
  UPDATE_CSIB_REQUEST,
  UPDATE_CSIB_SUCCESS,
  UPDATE_CSIB_FAILED,
} from "../constant/CSIBConstants";
import axios from "axios";
import { API_URL } from "./API_URL";

export const getCustomerListAction = (companyId) => async (dispatch) => {
  dispatch({ type: GET_CSIB_LIST_REQUEST });
  axios
    .get(`${API_URL}/api/companies/${companyId}/customers/`, {
      headers: {
        Authorization: `token ${localStorage.getItem("key")}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .then((data) => {
      dispatch({ type: GET_CSIB_LIST_SUCCESS, payload: data });
    })
    .catch((error) => {
      dispatch({ type: GET_CSIB_LIST_FAILED, payload: error });
    });
};

export const getCSIBLatestCustomersAction = (companyId) => async (dispatch) => {
  dispatch({ type: GET_CSIB_LATEST_CUSTOMERS_REQUEST });
  axios
    .get(`${API_URL}/api/companies/${companyId}/latest-customers`, {
      headers: {
        Authorization: `token ${localStorage.getItem("key")}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .then((data) => {
      dispatch({ type: GET_CSIB_LATEST_CUSTOMERS_SUCCESS, payload: data });
    })
    .catch((error) => {
      dispatch({
        type: GET_CSIB_LATEST_CUSTOMERS_FAILED,
        payload: error,
      });
    });
};
export const getCSIBLatestSuppliersAction = (companyId) => async (dispatch) => {
  dispatch({ type: GET_CSIB_LATEST_SUPPLIERS_REQUEST });
  axios
    .get(`${API_URL}/api/companies/${companyId}/latest-suppliers`, {
      headers: {
        Authorization: `token ${localStorage.getItem("key")}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .then((data) => {
      dispatch({ type: GET_CSIB_LATEST_SUPPLIERS_SUCCESS, payload: data });
    })
    .catch((error) => {
      dispatch({
        type: GET_CSIB_LATEST_SUPPLIERS_FAILED,
        payload: error,
      });
    });
};
export const getCSIBLatestInvestorsAction = (companyId) => async (dispatch) => {
  dispatch({ type: GET_CSIB_LATEST_INVESTORS_REQUEST });
  axios
    .get(`${API_URL}/api/companies/${companyId}/latest-investors`, {
      headers: {
        Authorization: `token ${localStorage.getItem("key")}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .then((data) => {
      dispatch({ type: GET_CSIB_LATEST_INVESTORS_SUCCESS, payload: data });
    })
    .catch((error) => {
      dispatch({
        type: GET_CSIB_LATEST_INVESTORS_FAILED,
        payload: error,
      });
    });
};
export const getCSIBLatestBorrowersAction = (companyId) => async (dispatch) => {
  dispatch({ type: GET_CSIB_LATEST_BORROWERS_REQUEST });
  axios
    .get(`${API_URL}/api/companies/${companyId}/latest-borrowers`, {
      headers: {
        Authorization: `token ${localStorage.getItem("key")}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .then((data) => {
      dispatch({ type: GET_CSIB_LATEST_BORROWERS_SUCCESS, payload: data });
    })
    .catch((error) => {
      dispatch({
        type: GET_CSIB_LATEST_BORROWERS_FAILED,
        payload: error,
      });
    });
};

export const getCSIBTypeListAction = () => async (dispatch) => {
  dispatch({ type: GET_CSIB_TYPE_LIST_REQUEST });
  axios
    .get(`${API_URL}/api/customer-types/`)
    .then((response) => {
      return response.data;
    })
    .then((data) => {
      dispatch({ type: GET_CSIB_TYPE_LIST_SUCCESS, payload: data });
    })
    .catch((error) => {
      dispatch({ type: GET_CSIB_TYPE_LIST_FAILED, payload: error });
    });
};

export const getCSIBListAction =
  (companyId, customerType) => async (dispatch) => {
    dispatch({ type: GET_CSIB_LIST_REQUEST });
    axios
      .get(
        `${API_URL}/api/companies/${companyId}/customers/?search=${customerType}`,
        {
          headers: {
            Authorization: `token ${localStorage.getItem("key")}`,
          },
        }
      )
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        dispatch({ type: GET_CSIB_LIST_SUCCESS, payload: data });
      })
      .catch((error) => {
        dispatch({ type: GET_CSIB_LIST_FAILED, payload: error });
      });
  };

export const addCSIBAction = (companyId, customer) => async (dispatch) => {
  dispatch({ type: ADD_CSIB_REQUEST });
  axios
    .post(`${API_URL}/api/companies/${companyId}/customers/`, customer, {
      headers: {
        Authorization: `token ${localStorage.getItem("key")}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .then((data) => {
      dispatch({ type: ADD_CSIB_SUCCESS, payload: data });
    })
    .catch((error) => {
      dispatch({ type: ADD_CSIB_FAILED, payload: error });
    });
};

export const deleteCSIBAction = (companyId, customerId) => async (dispatch) => {
  dispatch({ type: DELETE_CSIB_REQUEST });
  axios
    .delete(`${API_URL}/api/companies/${companyId}/customers/${customerId}`, {
      headers: {
        Authorization: `token ${localStorage.getItem("key")}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .then((data) => {
      dispatch({ type: DELETE_CSIB_SUCCESS, payload: data });
    })
    .catch((error) => {
      dispatch({ type: DELETE_CSIB_FAILED, payload: error });
    });
};

export const updateCSIBAction =
  (companyId, customer, id) => async (dispatch) => {
    dispatch({ type: UPDATE_CSIB_REQUEST });
    axios
      .put(`${API_URL}/api/companies/${companyId}/customers/${id}/`, customer, {
        headers: {
          Authorization: `token ${localStorage.getItem("key")}`,
        },
      })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        dispatch({ type: UPDATE_CSIB_SUCCESS, payload: data });
      })
      .catch((error) => {
        dispatch({ type: UPDATE_CSIB_FAILED, payload: error });
      });
  };
