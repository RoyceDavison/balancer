import { shallow } from "enzyme"; //这个是需要config setUp的
import React from "react";
import { AddExpensePage } from "../../components/AddExpensePage";
import expenses from "../fixtures/expenses";
import moment from "moment";

let startAddExpense, history, wrapper;
beforeEach(() => {
  startAddExpense = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(
    <AddExpensePage startAddExpense={startAddExpense} history={history} />
  );
});

test("should render AddExpensePage correctly", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should handle onSubmit", () => {
  wrapper.find("ExpenseForm").prop("onSubmit")(expenses[0]);
  expect(history.push).toHaveBeenLastCalledWith("/");
  expect(startAddExpense).toHaveBeenLastCalledWith(expenses[0]);
});
