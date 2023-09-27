import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import Category from "./category";
import Budget from "./budget";
import BudgetExpense from "./budgetexpense";
import BudgetRevenus from "./budgetrevenus";
import SubCategory from "./subcategory";

import Transactions from "./Transactions";
import CreateTransaction from "./CreateTransaction";

const AccountsRoute = ({ match }) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/accounts`} />
    <Route path={`${match.url}/categories`} component={Category} />
    <Route path={`${match.url}/sub-category`} component={SubCategory} />
    <Route path={`${match.url}/budgets`} component={Budget} />
    <Route path={`${match.url}/budget-expenses`} component={BudgetExpense} />
    <Route path={`${match.url}/budget-revenues`} component={BudgetRevenus} />
    <Route path={`${match.url}/budget-revenues`} component={BudgetRevenus} />
    <Route path={`${match.url}/transactions`} component={Transactions} />
    <Route
      path={`${match.url}/transactions-create`}
      component={CreateTransaction}
    />
  </Switch>
);

export default AccountsRoute;
