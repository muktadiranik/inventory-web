import {
  GET_CSIB_TYPE_LIST_REQUEST,
  GET_CSIB_TYPE_LIST_SUCCESS,
  GET_CSIB_TYPE_LIST_FAILED,
  GET_CSIB_LIST_REQUEST,
  GET_CSIB_LIST_SUCCESS,
  GET_CSIB_LIST_FAILED,
  ADD_CSIB_REQUEST,
  ADD_CSIB_SUCCESS,
  ADD_CSIB_FAILED,
  GET_CSIB_LATEST_CUSTOMERS_REQUEST,
  GET_CSIB_LATEST_CUSTOMERS_SUCCESS,
  GET_CSIB_LATEST_CUSTOMERS_FAILED,
  GET_CSIB_LATEST_SUPPLIERS_REQUEST,
  GET_CSIB_LATEST_SUPPLIERS_SUCCESS,
  GET_CSIB_LATEST_SUPPLIERS_FAILED,
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

export const CSIBReducer = (
  state = {
    csibLatestBorrowers: [],
    csibLatestCustomers: [],
    csibLatestSuppliers: [],
    csibLatestInvestors: [],
    addedCSIB: {},
    updatedCSIB: {},
    error: null,
  },
  action
) => {
  switch (action.type) {
    case GET_CSIB_LATEST_CUSTOMERS_REQUEST:
      return { ...state, loading: true, csibLatestCustomers: [], error: null };
    case GET_CSIB_LATEST_CUSTOMERS_SUCCESS:
      return { ...state, loading: false, csibLatestCustomers: action.payload };
    case GET_CSIB_LATEST_CUSTOMERS_FAILED:
      return { ...state, loading: false, error: action.payload };
    case GET_CSIB_LATEST_SUPPLIERS_REQUEST:
      return { ...state, loading: true, csibLatestSuppliers: [] };
    case GET_CSIB_LATEST_SUPPLIERS_SUCCESS:
      return { ...state, loading: false, csibLatestSuppliers: action.payload };
    case GET_CSIB_LATEST_SUPPLIERS_FAILED:
      return { ...state, loading: false, error: action.payload };
    case GET_CSIB_LATEST_INVESTORS_REQUEST:
      return { ...state, loading: true, csibLatestInvestors: [] };
    case GET_CSIB_LATEST_INVESTORS_SUCCESS:
      return { ...state, loading: false, csibLatestInvestors: action.payload };
    case GET_CSIB_LATEST_INVESTORS_FAILED:
      return { ...state, loading: false, error: action.payload };
    case GET_CSIB_LATEST_BORROWERS_REQUEST:
      return { ...state, loading: true, csibLatestBorrowers: [] };
    case GET_CSIB_LATEST_BORROWERS_SUCCESS:
      return { ...state, loading: false, csibLatestBorrowers: action.payload };
    case GET_CSIB_LATEST_BORROWERS_FAILED:
      return { ...state, loading: false, error: action.payload };
    case GET_CSIB_TYPE_LIST_REQUEST:
      return { ...state, loading: true, csibTypeList: [], error: null };
    case GET_CSIB_TYPE_LIST_SUCCESS:
      return { ...state, loading: false, csibTypeList: action.payload };
    case GET_CSIB_TYPE_LIST_FAILED:
      return { ...state, loading: false, error: action.payload };
    case GET_CSIB_LIST_REQUEST:
      return { ...state, loading: true, csibList: [], error: null };
    case GET_CSIB_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        csibList: action.payload,
      };
    case GET_CSIB_LIST_FAILED:
      return { ...state, loading: false, error: action.payload };
    case ADD_CSIB_REQUEST:
      return { ...state, loading: true, addedCSIB: {}, error: null };
    case ADD_CSIB_SUCCESS:
      return { ...state, loading: false, addedCSIB: action.payload };
    case ADD_CSIB_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };
    case DELETE_CSIB_REQUEST:
      return {
        ...state,
        loading: true,
        deleteSuccess: false,
      };
    case DELETE_CSIB_SUCCESS:
      return { ...state, loading: false, deleteSuccess: true };
    case DELETE_CSIB_FAILED:
      return {
        ...state,
        loading: false,
        deleteError: action.payload,
        deleteSuccess: false,
      };
    case UPDATE_CSIB_REQUEST:
      return { ...state, loading: true, updatedCSIB: {}, error: null };
    case UPDATE_CSIB_SUCCESS:
      return {
        ...state,
        loading: false,
        updatedCSIB: action.payload,
      };
    case UPDATE_CSIB_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };
    default:
      return state;
  }
};
