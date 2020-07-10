import React from "react";
import { connect } from "react-redux";
import numeral from "numeral";
import selectExpenses from "../redux/selectors/expenses";
import selectExpensesTotal from "../redux/selectors/expenses-total";
import { Link } from "react-router-dom";

export const ExpenseSummary = ({ expenseCount, expenseTotal }) => {
  const expenseWord = expenseCount == 1 ? "expense" : "expenses";
  const formattedExpenseTotal = numeral(expenseTotal / 100).format("$0,0.00");
  return (
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">
          Viewing <span>{expenseCount}</span> {expenseWord} totalling{" "}
          <span>{formattedExpenseTotal}</span>
        </h1>
        <div className="page-header__actions">
          <Link className="button" to="/create">
            Add Expense
          </Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const visibleExpense = selectExpenses(state.expenses, state.filters);
  return {
    expenseCount: visibleExpense.length,
    expenseTotal: selectExpensesTotal(visibleExpense),
  };
};

export default connect(mapStateToProps)(ExpenseSummary);
