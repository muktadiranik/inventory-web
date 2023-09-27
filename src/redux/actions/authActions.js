import axios from "axios";
import {
  GET_AUTH_TOKEN_REQUEST,
  GET_AUTH_TOKEN_SUCCESS,
  GET_AUTH_TOKEN_FAILED,
  CLEAN_AUTH_TOKEN_REQUEST,
  CLEAN_AUTH_TOKEN_SUCCESS,
  REGISTER_USER_WITH_PLAN_AND_COMPANY_REQUEST,
  REGISTER_USER_WITH_PLAN_AND_COMPANY_SUCCESS,
  REGISTER_USER_WITH_PLAN_AND_COMPANY_FAILED,
  GET_USER_DEATILS_REQUEST,
  GET_USER_DEATILS_SUCCESS,
  GET_USER_DEATILS_FAILED,
  GET_USER_PREFERENCE_REQUEST,
  GET_USER_PREFERENCE_SUCCESS,
  GET_USER_PREFERENCE_FAILED,
  UPDATE_USER_DEATILS_REQUEST,
  UPDATE_USER_DEATILS_SUCCESS,
  UPDATE_USER_DEATILS_FAILED,
  UPDATE_USER_PREFERENCE_REQUEST,
  UPDATE_USER_PREFERENCE_SUCCESS,
  UPDATE_USER_PREFERENCE_FAILED,
  GET_GROUP_LIST_REQUEST,
  GET_GROUP_LIST_SUCCESS,
  GET_GROUP_LIST_FAILED,
} from "../constant/authConstants";
import { API_URL } from "./API_URL";

export const getAuthKeyAction = (authData) => async (dispatch) => {
  dispatch({ type: GET_AUTH_TOKEN_REQUEST });
  axios
    .post(`${API_URL}/dj-rest-auth/login/`, {
      email: authData.email,
      username: "",
      password: authData.password,
    })
    .then((response) => {
      return response.data;
    })
    .then((data) => {
      dispatch({ type: GET_AUTH_TOKEN_SUCCESS, payload: data.key });
      localStorage.setItem("key", data.key);
    })
    .catch((error) => {
      dispatch({ type: GET_AUTH_TOKEN_FAILED, payload: error });
    });
};

export const cleanAuthKeyToken = () => async (dispatch) => {
  dispatch({ type: CLEAN_AUTH_TOKEN_REQUEST });
  localStorage.removeItem("key");
  dispatch({ type: CLEAN_AUTH_TOKEN_SUCCESS });
};

export const registerUserAction = (userData) => async (dispatch) => {
  dispatch({ type: GET_AUTH_TOKEN_REQUEST });
  axios
    .post(`${API_URL}/dj-rest-auth/registration/`, userData)
    .then((response) => {
      return response.data;
    })
    .then((data) => {
      dispatch({ type: GET_AUTH_TOKEN_SUCCESS, payload: data.key });
      localStorage.setItem("key", data.key);
    })
    .catch((error) => {
      dispatch({ type: GET_AUTH_TOKEN_FAILED, payload: error });
    });
};

export const registerUserWithPlanAndCompanyAction =
  (userData) => async (dispatch) => {
    dispatch({ type: REGISTER_USER_WITH_PLAN_AND_COMPANY_REQUEST });
    axios
      .post(`${API_URL}/dj-rest-auth/registration/`, userData)
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        dispatch({
          type: REGISTER_USER_WITH_PLAN_AND_COMPANY_SUCCESS,
          payload: data.key,
        });
        localStorage.setItem("key", data.key);
      })
      .catch((error) => {
        dispatch({
          type: REGISTER_USER_WITH_PLAN_AND_COMPANY_FAILED,
          payload: error,
        });
      });
  };

export const getUserDetailsAction = () => async (dispatch) => {
  dispatch({ type: GET_USER_DEATILS_REQUEST });
  axios
    .get(`${API_URL}/api/users/me`, {
      headers: {
        Authorization: `token ${localStorage.getItem("key")}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .then((data) => {
      dispatch({ type: GET_USER_DEATILS_SUCCESS, payload: data });
    })
    .catch((error) => {
      dispatch({ type: GET_USER_DEATILS_FAILED, payload: error });
    });
};

export const getUserPreferenceAction = () => async (dispatch) => {
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
    .catch((error) => {
      dispatch({ type: GET_USER_PREFERENCE_FAILED, payload: error });
    });
};

export const updateUserDetailsAction = (userData) => async (dispatch) => {
  dispatch({ type: UPDATE_USER_DEATILS_REQUEST });
  axios
    .put(`${API_URL}/api/users/me/`, userData, {
      headers: {
        Authorization: `token ${localStorage.getItem("key")}`,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      return response.data;
    })
    .then((data) => {
      dispatch({ type: UPDATE_USER_DEATILS_SUCCESS, payload: data });
    })
    .catch((error) => {
      dispatch({ type: UPDATE_USER_DEATILS_FAILED, payload: error });
    });
};

export const updateUserPreferenceAction = (userData) => async (dispatch) => {
  dispatch({ type: UPDATE_USER_PREFERENCE_REQUEST });
  axios
    .put(`${API_URL}/api/user-preferences/me/`, userData, {
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
      dispatch({ type: UPDATE_USER_PREFERENCE_FAILED, payload: error });
    });
};

export const getGroupListAction = () => async (dispatch) => {
  dispatch({ type: GET_GROUP_LIST_REQUEST });
  axios
    .get(`${API_URL}/api/groups/`)
    .then((response) => {
      return response.data;
    })
    .then((data) => {
      dispatch({ type: GET_GROUP_LIST_SUCCESS, payload: data });
    })
    .catch((error) => {
      dispatch({ type: GET_GROUP_LIST_FAILED, payload: error });
    });
};
