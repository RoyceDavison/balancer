import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "normalize.css/normalize.css"; //Normalize.css makes browsers render all elements more consistently and in line with modern standards.
import "./styles/styles.scss";
import AppRouter from "./routers/AppRouter";
import configureStore from "./redux/store/configStore";
import { addExpense } from "./redux/actions/expenses";
import { setTextFilter } from "./redux/actions/filters";
import getVisibleExpenses from "./redux/selectors/expenses";

import "react-dates/lib/css/_datepicker.css";

//for testing: npm test -- --watch
const store = configureStore();
// store.dispatch(
//   addExpense({
//     des: "water bill",
//     amount: 1000,
//   })
// );

// store.dispatch(
//   addExpense({
//     des: "gas bill",
//     createdAt: 1000,
//   })
// );

// store.dispatch(
//   addExpense({
//     des: "rent",
//     amount: 10902,
//   })
// );

// store.dispatch(setTextFilter("bill"));

// setTimeout(() => {
//   store.dispatch(setTextFilter("bill"));
// }, 2000);

const state = store.getState();
const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
console.log(visibleExpenses);

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
ReactDOM.render(jsx, document.getElementById("app"));
