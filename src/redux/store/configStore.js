import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import expenseReducer from "../reducers/expensesReducer";
import filterReducer from "../reducers/filterReducer";
import authReducer from "../reducers/auth.js";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//Store Creation
export default () => {
  const store = createStore(
    combineReducers({
      expenses: expenseReducer,
      filters: filterReducer,
      auth: authReducer,
    }),
    composeEnhancers(applyMiddleware(thunk))
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() //for redux-devltool settings
  );
  return store;
};
