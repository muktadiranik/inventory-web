import {
  GET_CURRENCY_LIST_REQUEST,
  GET_CURRENCY_LIST_SUCCESS,
  GET_CURRENCY_LIST_FAILED,
} from "../constant/currencyLanguageConstants";

export const currencyReducer = (state = { currencyList: [] }, action) => {
  switch (action.type) {
    case GET_CURRENCY_LIST_REQUEST:
      return { ...state, loading: true, currencyList: [] };
    case GET_CURRENCY_LIST_SUCCESS:
      return { ...state, loading: false, currencyList: action.payload };
    case GET_CURRENCY_LIST_FAILED:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
