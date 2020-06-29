import React, { Children } from "react";
import { connect } from "react-redux";
import ExpenseForm from "../components/ExpenseForm";
import { editExpense, removeExpense } from "../redux/actions/expenses";

const EditExpensePage = (props) => {
  return (
    <div>
      <ExpenseForm
        expense={props.expense}
        onSubmit={(expense) => {
          props.dispatch(editExpense(props.expense.id, expense));
          props.history.push("/");
        }}
      />
      {
        <button
          onClick={() => {
            props.dispatch(removeExpense({ id: props.expense.id }));
          }}
        >
          Remove
        </button>
      }
    </div>
  );
};

const mapStateToProp = (state, props) => {
  return {
    expense: state.expenses.find((expense) => {
      return expense.id === props.match.params.id;
    }),
  };
};

export default connect(mapStateToProp)(EditExpensePage);
