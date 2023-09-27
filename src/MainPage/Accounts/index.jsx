import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Transactions from "./Transactions";
import CreateTransaction from "./CreateTransaction";
import Products from "./Products";
import ProductCategory from "./ProductCategory";

const AccountsRoute = ({ match }) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/accounts`} />
    <Route path={`${match.url}/transactions`} component={Transactions} />
    <Route
      path={`${match.url}/transactions-create`}
      component={CreateTransaction}
    />
    <Route path={`${match.url}/products`} component={Products} />
    <Route path={`${match.url}/product-category`} component={ProductCategory} />
  </Switch>
);

export default AccountsRoute;
