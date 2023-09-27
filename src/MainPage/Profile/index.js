import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import Profile from "./Profile";

const userProfileRoute = ({ match }) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/user`} />
    <Route path={`${match.url}/profile`} component={Profile} />
  </Switch>
);

export default userProfileRoute;
