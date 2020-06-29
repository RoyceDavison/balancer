import { createStore, combineReducers } from "redux";
import expenseReducer from "../reducers/expensesReducer";
import filterReducer from "../reducers/filterReducer";

//Store Creation
export default () => {
  const store = createStore(
    combineReducers({
      expenses: expenseReducer,
      filters: filterReducer,
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() //for redux-devltool settings
  );
  return store;
};
