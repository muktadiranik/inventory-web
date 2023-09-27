import {
  GET_COMPANY_LIST_REQUEST,
  GET_COMPANY_LIST_SUCCESS,
  GET_COMPANY_LIST_FAILED,
  CHANGE_COMPANY,
  GET_COMPANY_REQUEST,
  GET_COMPANY_SUCCESS,
  GET_COMPANY_FAILED,
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

export const companyReducer = (
  state = {
    companyList: [],
  },
  action
) => {
  switch (action.type) {
    case GET_COMPANY_LIST_REQUEST:
      return { ...state, loading: true, companyList: [], error: null };
    case GET_COMPANY_LIST_SUCCESS:
      return { ...state, loading: false, companyList: action.payload };
    case GET_COMPANY_LIST_FAILED:
      return { ...state, loading: false, error: action.payload };
    case CHANGE_COMPANY:
      return { ...state, company: action.payload };
    case GET_COMPANY_REQUEST:
      return { ...state, loading: true, company: {} };
    case GET_COMPANY_SUCCESS:
      return {
        ...state,
        loading: false,
        company: action.payload,
      };
    case GET_COMPANY_FAILED:
      return { ...state, loading: false, error: action.payload };
    case GET_COMPANY_TYPE_LIST_REQUEST:
      return { ...state, loading: true, companyTypeList: [] };
    case GET_COMPANY_TYPE_LIST_SUCCESS:
      return { ...state, loading: false, companyTypeList: action.payload };
    case GET_COMPANY_TYPE_LIST_FAILED:
      return { ...state, loading: false, error: action.payload };
    case ADD_COMPANY_REQUEST:
      return {
        ...state,
        loading: true,
        addedCompany: {},
        success: false,
        updatedCompany: {},
      };
    case ADD_COMPANY_SUCCESS:
      return {
        ...state,
        loading: false,
        addedCompany: action.payload,
        success: true,
      };
    case ADD_COMPANY_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };

    case UPDATE_COMPANY_REQUEST:
      return {
        ...state,
        loading: true,
        updatedCompany: {},
        success: false,
        addedCompany: {},
      };
    case UPDATE_COMPANY_SUCCESS:
      return {
        ...state,
        loading: false,
        updatedCompany: action.payload,
        success: true,
      };
    case UPDATE_COMPANY_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };
    case DELETE_COMPANY_REQUEST:
      return {
        ...state,
        loading: true,
        deleteSuccess: false,
        addedCompany: {},
        updatedCompany: {},
      };
    case DELETE_COMPANY_SUCCESS:
      return {
        ...state,
        loading: false,
        deleteSuccess: true,
      };
    case DELETE_COMPANY_FAILED:
      return {
        ...state,
        loading: false,
        deleteError: action.payload,
        deleteSuccess: false,
      };
    default:
      return state;
  }
};
