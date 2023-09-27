import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import Customers from "./Customers";
import Suppliers from "./Suppliers";
import Items from "./Items";

const SettingsRoute = ({ match }) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/settings`} />
    <Route path={`${match.url}/customers`} component={Customers} />
    <Route path={`${match.url}/suppliers`} component={Suppliers} />
    <Route path={`${match.url}/items`} component={Items} />
  </Switch>
);

export default SettingsRoute;
