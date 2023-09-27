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
  GET_TRANSACTION_TYPE_REQUEST,
  GET_TRANSACTION_TYPE_SUCCESS,
  GET_TRANSACTION_TYPE_FAILED,
} from "../constant/transactionConstants";

export const transactionReducer = (
  state = {
    transactionList: [],
    addedTransaction: {},
    updatedTransaction: {},
    topTransaction: [],
    transactionType: [],
    error: null,
  },
  action
) => {
  switch (action.type) {
    case GET_TRANSACTION_LIST_REQUEST:
      return { ...state, loading: true, transactionList: [], error: null };
    case GET_TRANSACTION_LIST_SUCCESS:
      return { ...state, loading: false, transactionList: action.payload };
    case GET_TRANSACTION_LIST_FAILED:
      return { ...state, loading: false, error: action.payload };
    case ADD_TRANSACTION_REQUEST:
      return {
        ...state,
        loading: true,
        addedTransaction: {},
        updatedTransaction: {},
        success: false,
      };
    case ADD_TRANSACTION_SUCCESS:
      return {
        ...state,
        loading: false,
        addedTransaction: action.payload,
        success: true,
      };
    case ADD_TRANSACTION_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };
    case UPDATE_TRANSACTION_REQUEST:
      return {
        ...state,
        loading: true,
        updatedTransaction: {},
        addedTransaction: {},
        success: false,
      };
    case UPDATE_TRANSACTION_SUCCESS:
      return {
        ...state,
        loading: false,
        updatedTransaction: action.payload,
        success: true,
      };
    case UPDATE_TRANSACTION_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };
    case DELETE_TRANSACTION_REQUEST:
      return {
        ...state,
        loading: true,
        deleteSuccess: false,
        deleteError: null,
      };
    case DELETE_TRANSACTION_SUCCESS:
      return {
        ...state,
        loading: false,
        deleteSuccess: true,
      };
    case DELETE_TRANSACTION_FAILED:
      return {
        ...state,
        loading: false,
        deleteError: action.payload,
        deleteSuccess: false,
      };
    case GET_TOP_TRANSACTION_REQUEST:
      return { ...state, loading: true, topTransaction: {} };
    case GET_TOP_TRANSACTION_SUCCESS:
      return { ...state, loading: false, topTransaction: action.payload };
    case GET_TOP_TRANSACTION_FAILED:
      return { ...state, loading: false, error: action.payload };
    case GET_TRANSACTION_TYPE_REQUEST:
      return { ...state, loading: true, transactionType: [] };
    case GET_TRANSACTION_TYPE_SUCCESS:
      return { ...state, loading: false, transactionType: action.payload };
    case GET_TRANSACTION_TYPE_FAILED:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
