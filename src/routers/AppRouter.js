import React from "react";
import { Router, Route, Switch, BrowserRouter } from "react-router-dom";
import { createBrowserHistory } from "history";

import ExpenseDashboardPage from "./../components/ExpenseDashboardPage";
import AddExpensePage from "../components/AddExpensePage";
import EditExpensePage from "./../components/EditExpensePage";
import HelpPage from "../components/HelpPage";
import NotFoundPage from "../components/NotFoundPage";
import Header from "./../components/Header";
import LoginPage from "../components/LoginPage";
import PrivateRoute from "./PrivateRoute.js";

export const customHistory = createBrowserHistory();
const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route path="/" component={LoginPage} exact={true} />
        <Route path="/dashboard" component={ExpenseDashboardPage} />
        <Route path="/create" component={AddExpensePage} />
        <Route path="/edit/:id" component={EditExpensePage} />
        <Route component={LoginPage} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
