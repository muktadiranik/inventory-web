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

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_AUTH_TOKEN_REQUEST:
      return {
        ...state,
        loading: true,
        token: {},
        error: null,
        success: false,
      };
    case GET_AUTH_TOKEN_SUCCESS:
      return { ...state, loading: false, token: action.payload, success: true };
    case GET_AUTH_TOKEN_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };
    case CLEAN_AUTH_TOKEN_REQUEST:
      return { ...state, loading: true };
    case CLEAN_AUTH_TOKEN_SUCCESS:
      return { loading: false, token: null };
    case REGISTER_USER_WITH_PLAN_AND_COMPANY_REQUEST:
      return { ...state, loading: true, token: {}, success: false };
    case REGISTER_USER_WITH_PLAN_AND_COMPANY_SUCCESS:
      return { ...state, loading: false, token: action.payload, success: true };
    case REGISTER_USER_WITH_PLAN_AND_COMPANY_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };
    case GET_USER_DEATILS_REQUEST:
      return { ...state, loading: true, userDetails: {} };
    case GET_USER_DEATILS_SUCCESS:
      return { ...state, loading: false, userDetails: action.payload };
    case GET_USER_DEATILS_FAILED:
      return { ...state, loading: false, error: action.payload };
    case GET_USER_PREFERENCE_REQUEST:
      return { ...state, loading: true, userPreference: {} };
    case GET_USER_PREFERENCE_SUCCESS:
      return { ...state, loading: false, userPreference: action.payload };
    case GET_USER_PREFERENCE_FAILED:
      return { ...state, loading: false, error: action.payload };
    case UPDATE_USER_DEATILS_REQUEST:
      return {
        ...state,
        loading: true,
        updatedUserDetails: {},
        success: false,
        error: null,
      };
    case UPDATE_USER_DEATILS_SUCCESS:
      return {
        ...state,
        loading: false,
        updatedUserDetails: action.payload,
        success: true,
      };
    case UPDATE_USER_DEATILS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };
    case UPDATE_USER_PREFERENCE_REQUEST:
      return {
        ...state,
        loading: true,
        updatedUserPreference: {},
        success: false,
        error: null,
      };
    case UPDATE_USER_PREFERENCE_SUCCESS:
      return {
        ...state,
        loading: false,
        updatedUserPreference: action.payload,
        success: true,
      };
    case UPDATE_USER_PREFERENCE_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };
    case GET_GROUP_LIST_REQUEST:
      return { ...state, loading: true, groupList: {} };
    case GET_GROUP_LIST_SUCCESS:
      return { ...state, loading: false, groupList: action.payload };
    case GET_GROUP_LIST_FAILED:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
