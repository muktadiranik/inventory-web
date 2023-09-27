import {
  GET_COMPANY_LIST_REQUEST,
  GET_COMPANY_LIST_SUCCESS,
  GET_COMPANY_LIST_FAILED,
  CHANGE_COMPANY,
  GET_COMPANY_REQUEST,
  GET_COMPANY_SUCCESS,
  GET_COMPANY_TYPE_LIST_REQUEST,
  GET_COMPANY_TYPE_LIST_SUCCESS,
  GET_COMPANY_TYPE_LIST_FAILED,
  ADD_COMPANY_REQUEST,
  ADD_COMPANY_SUCCESS,
  ADD_COMPANY_FAILED,
  UPDATE_COMPANY_REQUEST,
  UPDATE_COMPANY_SUCCESS,
  UPDATE_COMPANY_FAILED,
  DELETE_COMPANY_REQUEST,
  DELETE_COMPANY_SUCCESS,
  DELETE_COMPANY_FAILED,
} from "../constant/companyConstants";
import {
  GET_USER_PREFERENCE_REQUEST,
  GET_USER_PREFERENCE_SUCCESS,
  GET_USER_PREFERENCE_FAILED,
  UPDATE_USER_PREFERENCE_REQUEST,
  UPDATE_USER_PREFERENCE_SUCCESS,
  UPDATE_USER_PREFERENCE_FAILED,
} from "../constant/authConstants";
import axios from "axios";
import { API_URL } from "./API_URL";

export const getLocalStorageCompanyAction = () => async (dispatch) => {
  dispatch({ type: GET_COMPANY_REQUEST });
  dispatch({
    type: GET_COMPANY_SUCCESS,
    payload: JSON.parse(localStorage.getItem("company")),
  });
};

export const getUserPreferenceCompanyAction = () => async (dispatch) => {
  dispatch({ type: GET_COMPANY_LIST_REQUEST });
  axios
    .get(`${API_URL}/api/companies/`, {
      headers: {
        Authorization: `token ${localStorage.getItem("key")}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .then((data) => {
      localStorage.setItem("companyList", JSON.stringify(data));
      dispatch({ type: GET_COMPANY_LIST_SUCCESS, payload: data });
    })
    .then(() => {
      dispatch({ type: GET_USER_PREFERENCE_REQUEST });
      axios
        .get(`${API_URL}/api/user-preferences/me/`, {
          headers: {
            Authorization: `token ${localStorage.getItem("key")}`,
          },
        })
        .then((response) => {
          return response.data;
        })
        .then((data) => {
          dispatch({ type: GET_USER_PREFERENCE_SUCCESS, payload: data });
          localStorage.setItem("userPreference", JSON.stringify(data));
        })
        .then(() => {
          const companyList = JSON.parse(localStorage.getItem("companyList"));
          const userPreference = JSON.parse(
            localStorage.getItem("userPreference")
          );
          for (const key in companyList) {
            if (companyList[key].id === userPreference.company) {
              localStorage.setItem("company", JSON.stringify(companyList[key]));
            }
          }
        })
        .then(() => {
          getLocalStorageCompanyAction()(dispatch);
        })
        .catch((error) => {
          dispatch({
            type: GET_USER_PREFERENCE_FAILED,
            payload: error,
          });
        });
    });
};

export const getCompanyListAction = () => async (dispatch) => {
  dispatch({ type: GET_COMPANY_LIST_REQUEST });
  axios
    .get(`${API_URL}/api/companies/`, {
      headers: {
        Authorization: `token ${localStorage.getItem("key")}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .then((data) => {
      dispatch({ type: GET_COMPANY_LIST_SUCCESS, payload: data });
      dispatch({ type: GET_COMPANY_REQUEST });
      dispatch({
        type: GET_COMPANY_SUCCESS,
        payload: JSON.parse(localStorage.getItem("company")),
      });
    })
    .catch((error) => {
      dispatch({ type: GET_COMPANY_LIST_FAILED, payload: error });
    });
};

export const changeCompanyAction =
  (companyId, currency, language) => (dispatch) => {
    dispatch({
      type: CHANGE_COMPANY,
      payload: JSON.parse(localStorage.getItem("company")),
    });
    const preferenceData = new FormData();
    preferenceData.append("currency", currency);
    preferenceData.append("language", language);
    preferenceData.append("company", companyId);
    dispatch({ type: UPDATE_USER_PREFERENCE_REQUEST });
    axios
      .put(`${API_URL}/api/user-preferences/me/`, preferenceData, {
        headers: {
          Authorization: `token ${localStorage.getItem("key")}`,
        },
      })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        dispatch({ type: UPDATE_USER_PREFERENCE_SUCCESS, payload: data });
      })
      .catch((error) => {
        dispatch({
          type: UPDATE_USER_PREFERENCE_FAILED,
          payload: error,
        });
      });
  };

export const getCompanyTypeListAction = () => async (dispatch) => {
  dispatch({ type: GET_COMPANY_TYPE_LIST_REQUEST });
  axios
    .get(`${API_URL}/api/company-types/`)
    .then((response) => {
      return response.data;
    })
    .then((data) => {
      dispatch({ type: GET_COMPANY_TYPE_LIST_SUCCESS, payload: data });
    })
    .catch((error) => {
      dispatch({ type: GET_COMPANY_TYPE_LIST_FAILED, payload: error });
    });
};

export const addCompanyAction = (company) => async (dispatch) => {
  dispatch({ type: ADD_COMPANY_REQUEST });
  axios
    .post(`${API_URL}/api/companies/`, company, {
      headers: {
        Authorization: `token ${localStorage.getItem("key")}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .then((data) => {
      dispatch({ type: ADD_COMPANY_SUCCESS, payload: data });
    })
    .catch((error) => {
      dispatch({ type: ADD_COMPANY_FAILED, payload: error });
    });
};

export const updateCompanyAction = (company, companyId) => async (dispatch) => {
  dispatch({ type: UPDATE_COMPANY_REQUEST });
  axios
    .put(`${API_URL}/api/companies/${companyId}/`, company, {
      headers: {
        Authorization: `token ${localStorage.getItem("key")}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .then((data) => {
      dispatch({ type: UPDATE_COMPANY_SUCCESS, payload: data });
    })
    .then(() => {
      localStorage.removeItem("company");
    })
    .then(() => {
      getUserPreferenceCompanyAction()(dispatch);
    })
    .catch((error) => {
      dispatch({ type: UPDATE_COMPANY_FAILED, payload: error });
    });
};

export const deleteCompanyAction = (companyId) => async (dispatch) => {
  dispatch({ type: DELETE_COMPANY_REQUEST });
  axios
    .delete(`${API_URL}/api/companies/${companyId}/`, {
      headers: {
        Authorization: `token ${localStorage.getItem("key")}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .then((data) => {
      dispatch({ type: DELETE_COMPANY_SUCCESS, payload: data });
    })
    .catch((error) => {
      dispatch({ type: DELETE_COMPANY_FAILED, payload: error });
    });
};
