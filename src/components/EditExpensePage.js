import React, { Children } from "react";
import { connect } from "react-redux";
import ExpenseForm from "../components/ExpenseForm";
import {
  startEditExpense,
  startRemoveExpense,
} from "../redux/actions/expenses";

export class EditExpensePage extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onRemove = this.onRemove.bind(this);
  }

  onSubmit(expense) {
    this.props.startEditExpense(this.props.expense.id, expense);
    this.props.history.push("/");
  }

  onRemove() {
    this.props.startRemoveExpense({ id: this.props.expense.id });
    this.props.history.push("/");
  }

  render() {
    return (
      <div>
        <ExpenseForm expense={this.props.expense} onSubmit={this.onSubmit} />
        {<button onClick={this.onRemove}>Remove</button>}
      </div>
    );
  }
}

const mapDispatchProps = (dispatch, props) => {
  return {
    startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
    startRemoveExpense: (data) => dispatch(startRemoveExpense(data)),
  };
};

const mapStateToProp = (state, props) => {
  return {
    expense: state.expenses.find((expense) => {
      return expense.id === props.match.params.id;
    }),
  };
};

export default connect(mapStateToProp, mapDispatchProps)(EditExpensePage);
