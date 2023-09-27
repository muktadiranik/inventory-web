import {
  GET_EDITOR_LIST_REQUEST,
  GET_EDITOR_LIST_SUCCESS,
  GET_EDITOR_LIST_FAILED,
  ADD_EDITOR_REQUEST,
  ADD_EDITOR_SUCCESS,
  ADD_EDITOR_FAILED,
  UPDATE_EDITOR_REQUEST,
  UPDATE_EDITOR_SUCCESS,
  UPDATE_EDITOR_FAILED,
  DELETE_EDITOR_REQUEST,
  DELETE_EDITOR_SUCCESS,
  DELETE_EDITOR_FAILED,
} from "../constant/editorConstants";
import axios from "axios";
import { API_URL } from "./API_URL";

export const getEditorListAction = (companyId) => async (dispatch) => {
  dispatch({ type: GET_EDITOR_LIST_REQUEST });
  axios
    .get(`${API_URL}/api/companies/${companyId}/editors/`, {
      headers: {
        Authorization: `token ${localStorage.getItem("key")}`,
      },
    })
    .then((response) => {
      dispatch({ type: GET_EDITOR_LIST_SUCCESS, payload: response.data });
    })
    .catch((error) => {
      dispatch({ type: GET_EDITOR_LIST_FAILED, payload: error });
    });
};

export const addEditorAction = (companyId, editor) => async (dispatch) => {
  dispatch({ type: ADD_EDITOR_REQUEST });
  axios
    .post(`${API_URL}/api/companies/${companyId}/editors/`, editor, {
      headers: {
        Authorization: `token ${localStorage.getItem("key")}`,
      },
    })
    .then((response) => {
      dispatch({ type: ADD_EDITOR_SUCCESS, payload: response.data });
    })
    .catch((error) => {
      dispatch({ type: ADD_EDITOR_FAILED, payload: error });
    });
};

export const updateEditorAction =
  (companyId, editorId, editor) => async (dispatch) => {
    dispatch({ type: UPDATE_EDITOR_REQUEST });
    axios
      .put(
        `${API_URL}/api/companies/${companyId}/editors/${editorId}/`,
        editor,
        {
          headers: {
            Authorization: `token ${localStorage.getItem("key")}`,
          },
        }
      )
      .then((response) => {
        dispatch({ type: UPDATE_EDITOR_SUCCESS, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: UPDATE_EDITOR_FAILED, payload: error });
      });
  };

export const deleteEditorAction = (companyId, editorId) => async (dispatch) => {
  dispatch({ type: DELETE_EDITOR_REQUEST });
  axios
    .delete(`${API_URL}/api/companies/${companyId}/editors/${editorId}/`, {
      headers: {
        Authorization: `token ${localStorage.getItem("key")}`,
      },
    })
    .then((response) => {
      dispatch({ type: DELETE_EDITOR_SUCCESS, payload: response.data });
    })
    .catch((error) => {
      dispatch({ type: DELETE_EDITOR_FAILED, payload: error });
    });
};
