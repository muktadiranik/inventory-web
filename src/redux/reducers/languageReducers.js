import {
  GET_LANGUAGE_LIST_REQUEST,
  GET_LANGUAGE_LIST_SUCCESS,
  GET_LANGUAGE_LIST_FAILED,
} from "../constant/languageConstants";

export const languageReducer = (state = { languageList: [] }, action) => {
  switch (action.type) {
    case GET_LANGUAGE_LIST_REQUEST:
      return { ...state, loading: true, languageList: [] };
    case GET_LANGUAGE_LIST_SUCCESS:
      return { ...state, loading: false, languageList: action.payload };
    case GET_LANGUAGE_LIST_FAILED:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
