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

export const productReducer = (
  state = {
    productList: [],
    productCategoryList: [],
    addedProductCategory: {},
    updatedProductCategory: {},
    addedProduct: {},
    updatedProduct: {},
  },
  action
) => {
  switch (action.type) {
    case GET_PRODUCT_LIST_REQUEST:
      return { ...state, isLoading: true, error: null };
    case GET_PRODUCT_LIST_SUCCESS:
      return { ...state, isLoading: false, productList: action.payload };
    case GET_PRODUCT_LIST_FAILED:
      return { ...state, isLoading: false, error: action.payload };
    case ADD_PRODUCT_REQUEST:
      return { ...state, isLoading: true, addedProduct: {}, error: null };
    case ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        addedProduct: action.payload,
        success: true,
      };
    case ADD_PRODUCT_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        success: false,
      };
    case DELETE_PRODUCT_REQUEST:
      return {
        ...state,
        isLoading: true,
        deleteSuccess: false,
        deleteError: null,
      };
    case DELETE_PRODUCT_SUCCESS:
      return { ...state, isLoading: false, deleteSuccess: true };
    case DELETE_PRODUCT_FAILED:
      return {
        ...state,
        isLoading: false,
        deleteError: action.payload,
        deleteSuccess: false,
      };
    case UPDATE_PRODUCT_REQUEST:
      return {
        ...state,
        isLoading: true,
        updatedProduct: {},
        error: null,
      };
    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        updatedProduct: action.payload,
        success: true,
      };
    case UPDATE_PRODUCT_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        success: false,
      };
    case GET_PRODUCT_CATEGORY_REQUEST:
      return { ...state, isLoading: true, error: null };
    case GET_PRODUCT_CATEGORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        productCategoryList: action.payload,
      };
    case GET_PRODUCT_CATEGORY_FAILED:
      return { ...state, isLoading: false, error: action.payload };
    case ADD_PRODUCT_CATEGORY_REQUEST:
      return {
        ...state,
        isLoading: true,
        addedProductCategory: {},
        error: null,
      };
    case ADD_PRODUCT_CATEGORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        addedProductCategory: action.payload,
        success: true,
      };
    case ADD_PRODUCT_CATEGORY_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        success: false,
      };
    case DELETE_PRODUCT_CATEGORY_REQUEST:
      return {
        ...state,
        isLoading: true,
        deleteSuccess: false,
        deleteError: null,
      };
    case DELETE_PRODUCT_CATEGORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        deleteSuccess: true,
      };
    case DELETE_PRODUCT_CATEGORY_FAILED:
      return {
        ...state,
        isLoading: false,
        deleteError: action.payload,
        deleteSuccess: false,
      };
    case UPDATE_PRODUCT_CATEGORY_REQUEST:
      return {
        ...state,
        isLoading: true,
        updatedProductCategory: {},
        error: null,
      };
    case UPDATE_PRODUCT_CATEGORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        updatedProductCategory: action.payload,
        success: true,
      };
    case UPDATE_PRODUCT_CATEGORY_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        success: false,
      };

    default:
      return state;
  }
};
