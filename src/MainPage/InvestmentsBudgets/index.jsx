import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import Investment from "./Investment";
import Budget from "./Budget";

const InvestmentRoute = ({ match }) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/investments`} />
    <Route path={`${match.url}/investment`} component={Investment} />
    <Route path={`${match.url}/budget`} component={Budget} />
  </Switch>
);

export default InvestmentRoute;
