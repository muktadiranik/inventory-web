import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { planReducer } from "./redux/reducers/planReducers";
import { transactionReducer } from "./redux/reducers/transactionReducers";
import { languageReducer } from "./redux/reducers/languageReducers";
import { currencyReducer } from "./redux/reducers/currencyReducers";
import { userReducer } from "./redux/reducers/authReducers";
import { companyReducer } from "./redux/reducers/companyReducers";
import { CSIBReducer } from "./redux/reducers/CSIBReducers";
import { editorReducer } from "./redux/reducers/editorReducers";
import { productReducer } from "./redux/reducers/productReducers";

const middleware = [thunk];

const token = localStorage.getItem("key") ? localStorage.getItem("key") : null;
const company = JSON.parse(localStorage.getItem("company"))
  ? JSON.parse(localStorage.getItem("company"))
  : null;

const preloadedState = {
  userReducer: { token: token },
  companyReducer: { company: company },
};

const store = configureStore({
  reducer: {
    languageReducer: languageReducer,
    currencyReducer: currencyReducer,
    planReducer: planReducer,
    CSIBReducer: CSIBReducer,
    companyReducer: companyReducer,
    userReducer: userReducer,
    transactionReducer: transactionReducer,
    productReducer: productReducer,
    editorReducer: editorReducer,
  },
  preloadedState: preloadedState,
  devTools: process.env.NODE_ENV !== "production",
  middleware: middleware,
});

export default store;
