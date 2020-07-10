import React, { Children } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "normalize.css/normalize.css"; //Normalize.css makes browsers render all elements more consistently and in line with modern standards.
import "./styles/styles.scss";
import AppRouter, { customHistory } from "./routers/AppRouter";
import configureStore from "./redux/store/configStore";
import { startSetExpenses } from "./redux/actions/expenses";
import { login, logout } from "./redux/actions/auth";
import LoadingPage from "./components/LoadingPage";
import "react-dates/lib/css/_datepicker.css";
import { firebase } from "./firebase/firebase";
//for testing: npm test -- --watch

const store = configureStore();
const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(<LoadingPage />, document.getElementById("app"));

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById("app"));
    hasRendered = true;
  }
};

store.dispatch(startSetExpenses()).then(() => {
  ReactDOM.render(jsx, document.getElementById("app"));
});

// firebase.auth().onAuthStateChanged((user) => {
//   if (user) {
//     console.log("log in");
//     store.dispatch(login(user.uid));
//     store.dispatch(startSetExpenses()).then(() => {
//       renderApp();
//       if (customHistory.location.pathname === "/") {
//         customHistory.push("/dashboard");
//       }
//     });
//   } else {
//     console.log("log out");
//     store.dispatch(logout());
//     renderApp();
//     customHistory.push("/");
//   }
// });
