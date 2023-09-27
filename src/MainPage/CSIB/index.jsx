import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Customers from "./Customers";
import Suppliers from "./Suppliers";
import Investors from "./Investors";
import Borrowers from "./Borrowers";

const Uiinterfaceroute = ({ match }) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/csib`} />
    <Route path={`${match.url}/customers`} component={Customers} />
    <Route path={`${match.url}/suppliers`} component={Suppliers} />
    <Route path={`${match.url}/investors`} component={Investors} />
    <Route path={`${match.url}/borrowers`} component={Borrowers} />
  </Switch>
);

export default Uiinterfaceroute;
