import axios from "axios";
import {
  GET_PRODUCT_LIST_REQUEST,
  GET_PRODUCT_LIST_SUCCESS,
  GET_PRODUCT_LIST_FAILED,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAILED,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILED,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILED,
  GET_PRODUCT_CATEGORY_REQUEST,
  GET_PRODUCT_CATEGORY_SUCCESS,
  GET_PRODUCT_CATEGORY_FAILED,
  ADD_PRODUCT_CATEGORY_REQUEST,
  ADD_PRODUCT_CATEGORY_SUCCESS,
  ADD_PRODUCT_CATEGORY_FAILED,
  DELETE_PRODUCT_CATEGORY_REQUEST,
  DELETE_PRODUCT_CATEGORY_SUCCESS,
  DELETE_PRODUCT_CATEGORY_FAILED,
  UPDATE_PRODUCT_CATEGORY_REQUEST,
  UPDATE_PRODUCT_CATEGORY_SUCCESS,
  UPDATE_PRODUCT_CATEGORY_FAILED,
} from "../constant/productConstants";
import { API_URL } from "./API_URL";

export const getProductListAction = (companyId) => async (dispatch) => {
  dispatch({ type: GET_PRODUCT_LIST_REQUEST });
  axios
    .get(`${API_URL}/api/companies/${companyId}/products/`, {
      headers: {
        Authorization: `token ${localStorage.getItem("key")}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .then((data) => {
      dispatch({ type: GET_PRODUCT_LIST_SUCCESS, payload: data });
    })
    .catch((error) => {
      dispatch({ type: GET_PRODUCT_LIST_FAILED, payload: error });
    });
};

export const addProductAction =
  (companyId, token, product) => async (dispatch) => {
    dispatch({ type: ADD_PRODUCT_REQUEST });
    axios
      .post(`${API_URL}/api/companies/${companyId}/products/`, product, {
        headers: {
          Authorization: `token ${token}`,
        },
      })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        dispatch({ type: ADD_PRODUCT_SUCCESS, payload: data });
      })
      .catch((error) => {
        dispatch({ type: ADD_PRODUCT_FAILED, payload: error });
      });
  };

export const deleteProductAction =
  (companyId, token, productId) => async (dispatch) => {
    dispatch({ type: DELETE_PRODUCT_REQUEST });
    axios
      .delete(`${API_URL}/api/companies/${companyId}/products/${productId}/`, {
        headers: {
          Authorization: `token ${token}`,
        },
      })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: data });
      })
      .catch((error) => {
        dispatch({ type: DELETE_PRODUCT_FAILED, payload: error });
      });
  };

export const updateProductAction =
  (companyId, token, product, productId) => async (dispatch) => {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });
    axios
      .put(
        `${API_URL}/api/companies/${companyId}/products/${productId}/`,
        product,
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
        dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data });
      })
      .catch((error) => {
        dispatch({ type: UPDATE_PRODUCT_FAILED, payload: error });
      });
  };

export const getProductCategoryAction =
  (companyId, token) => async (dispatch) => {
    dispatch({ type: GET_PRODUCT_CATEGORY_REQUEST });
    axios
      .get(`${API_URL}/api/companies/${companyId}/product-categories/`, {
        headers: {
          Authorization: `token ${token}`,
        },
      })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        dispatch({ type: GET_PRODUCT_CATEGORY_SUCCESS, payload: data });
      })
      .catch((error) => {
        dispatch({ type: GET_PRODUCT_CATEGORY_FAILED, payload: error });
      });
  };

export const addProductCategoryAction =
  (companyId, token, category) => async (dispatch) => {
    dispatch({ type: ADD_PRODUCT_CATEGORY_REQUEST });
    axios
      .post(
        `${API_URL}/api/companies/${companyId}/product-categories/`,
        category,
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
        dispatch({ type: ADD_PRODUCT_CATEGORY_SUCCESS, payload: data });
      })
      .catch((error) => {
        dispatch({ type: ADD_PRODUCT_CATEGORY_FAILED, payload: error });
      });
  };

export const deleteProductCategoryAction =
  (companyId, token, categoryId) => async (dispatch) => {
    dispatch({ type: DELETE_PRODUCT_CATEGORY_REQUEST });
    axios
      .delete(
        `${API_URL}/api/companies/${companyId}/product-categories/${categoryId}/`,
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
        dispatch({ type: DELETE_PRODUCT_CATEGORY_SUCCESS, payload: data });
      })
      .catch((error) => {
        dispatch({
          type: DELETE_PRODUCT_CATEGORY_FAILED,
          payload: error,
        });
      });
  };

export const updateProductCategoryAction =
  (companyId, token, category, categoryId) => async (dispatch) => {
    dispatch({ type: UPDATE_PRODUCT_CATEGORY_REQUEST });
    axios
      .put(
        `${API_URL}/api/companies/${companyId}/product-categories/${categoryId}/`,
        category,
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
        dispatch({ type: UPDATE_PRODUCT_CATEGORY_SUCCESS, payload: data });
      })
      .catch((error) => {
        dispatch({
          type: UPDATE_PRODUCT_CATEGORY_FAILED,
          payload: error,
        });
      });
  };
