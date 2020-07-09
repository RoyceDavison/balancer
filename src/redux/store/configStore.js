import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import expenseReducer from "../reducers/expensesReducer";
import filterReducer from "../reducers/filterReducer";
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//Store Creation
export default () => {
  const store = createStore(
    combineReducers({
      expenses: expenseReducer,
      filters: filterReducer,
    }),
    composeEnhancers(applyMiddleware(thunk))
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() //for redux-devltool settings
  );
  return store;
};
