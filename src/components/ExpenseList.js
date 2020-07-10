import React from "react";
import { connect } from "react-redux";
import ExpenseListItem from "./ExpenseListItem";
import selectExpenses from "../redux/selectors/expenses";

//connect a component to the redux store, it is reactive: when the store change, the component get re-render
export const ExpenseList = (props) => (
  <div className="content-container">
    <div className="list-header">
      <div className="show-for-mobile">Expenses</div>
      <div className="show-for-desktop">Expense</div>
      <div className="show-for-desktop">Amount</div>
    </div>
    <div className="list-body">
      {props.expenses.length === 0 ? (
        <div className="list-item list-item--message">
          <span>
            <h3>No Expense</h3>
          </span>
        </div>
      ) : (
        props.expenses.map((expense) => {
          return <ExpenseListItem key={expense.id} {...expense} />;
        })
      )}
    </div>
  </div>
);

//HOC:higer order component
//Version 1
// const ConnectExpenseList = connect((state) => {
//   return {
//     expenses: state.expenses,
//   };
// })(ExpenseList);
// export default ConnectExpenseList;

//Version 2
// export default connect((state) => {
//   return {
//     expenses: state.expenses,
//   };
// })(ExpenseList);

//Version 3
//mapStateToProps is used to defined the things we want to get off from the store
// const mapStateToProps = (state) => {
//   return {
//     expenses: state.expenses,
//     filters: state.filters,
//   };
// };

//mapStateToProps is used to defined the things we want to get off from the store
//so the regular component could access these things via props
const mapStateToProps = (state) => {
  return {
    expenses: selectExpenses(state.expenses, state.filters),
  };
};

export default connect(mapStateToProps)(ExpenseList);
