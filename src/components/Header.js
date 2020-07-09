import React from "react";
import { BrowserRouter, Route, Switch, Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { startLogout } from "../redux/actions/auth";

export const Header = ({ startLogout }) => (
  <header>
    <h1>Expensify</h1>
    <NavLink to="/" activeClassName="is-active">
      Dashboard
    </NavLink>
    <NavLink to="/create" activeClassName="is-active">
      CreateExpense
    </NavLink>
    <button onClick={startLogout}>Logout</button>
  </header>
);

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout()),
});

export default connect(undefined, mapDispatchToProps)(Header);
