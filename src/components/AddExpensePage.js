import React from "react";
import { connect } from "react-redux";
import ExpenseForm from "./ExpenseForm";
import { addExpense } from "../redux/actions/expenses";

export const AddExpensePage = (props) => (
  <div>
    <h1>Add Expense</h1>
    <ExpenseForm
      onSubmit={(expense) => {
        //props.dispatch(addExpense(expense));

        //for testing
        props.onSubmit(expense);
        props.history.push("/");
      }}
    />
  </div>
);

//use for testing purpose
const mapDispatchProps = (dispatch) => {
  return {
    onSubmit: (expense) => dispatch(addExpense(expense)),
  };
};

export default connect(undefined, mapDispatchProps)(AddExpensePage);
