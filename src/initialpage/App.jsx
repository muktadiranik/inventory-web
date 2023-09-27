import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import LoginPage from "./loginpage";
import RegistrationPage from "./RegistrationPage";
import DefaultLayout from "./Sidebar/DefaultLayout";
import Subscription from "../MainPage/LandingPage/Subscription";
import { IntlProvider } from "react-intl";
import { LOCALES } from "../i18n/locales";
import { MESSAGES } from "../i18n/messages";

export default class App extends Component {
  getInitialLocale() {
    const savedLocale = localStorage.getItem("locale");
    return savedLocale || LOCALES.BANGLA;
  }

  state = {
    currentLocale: this.getInitialLocale(),
  };

  handleChange = (e) => {
    localStorage.setItem("locale", e.target.value);
  };

  render() {
    return (
      <IntlProvider
        locale={this.state.currentLocale}
        messages={MESSAGES[this.state.currentLocale]}>
        <Switch>
          <Route path='/login' component={LoginPage} />
          <Route path='/register' component={RegistrationPage} />
          <Route path='/app' component={DefaultLayout} />
          <Route path='/' component={Subscription} />
        </Switch>
      </IntlProvider>
    );
  }
}
