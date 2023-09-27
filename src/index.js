import React from "react";
import ReactDOM from "react-dom";
import Main from "./Entryfile/Main";
import { Provider } from "react-redux";
import store from "./store";

window.Popper = require("popper.js").default;

ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById("app")
);

if (module.hot) {
  module.hot.accept();
}
