import { shallow } from "enzyme"; //这个是需要config setUp的
import React from "react";
import ExpenseForm from "../../components/ExpenseForm";
import expenses from "../fixtures/expenses";
import moment from "moment";

test("should render ExpenseForm correctly", () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
});

test("should render ExpenseForm with expense data", () => {
  const wrapper = shallow(<ExpenseForm expense={expenses[0]} />);
  expect(wrapper).toMatchSnapshot();
});

test("should render error for invalid form submission", () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
  wrapper.find("form").simulate("submit", {
    preventDefault: () => {},
  });
  expect(wrapper.state("error").length).toBeGreaterThan(0);
  expect(wrapper).toMatchSnapshot();
});

test("should set description on input change", () => {
  const wrapper = shallow(<ExpenseForm />);
  const value = "new description";
  //find the first input element
  wrapper.find("input").at(0).simulate("change", {
    target: { value },
  });
  expect(wrapper.state("des")).toBe(value);
});

test("should set note on textarea change", () => {
  const value = "new note value";
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find("textarea").simulate("change", {
    target: { value },
  });
  expect(wrapper.state("note")).toBe(value);
});

test("should set amount change", () => {
  const value = "12.35";
  const wrapper = shallow(<ExpenseForm />);

  wrapper.find("input").at(1).simulate("change", {
    target: { value },
  });

  expect(wrapper.state("amount")).toBe(value);
});

test("should not set amount change if invalid input", () => {
  const value = "12.3512321";
  const wrapper = shallow(<ExpenseForm />);

  wrapper.find("input").at(1).simulate("change", {
    target: { value },
  });

  expect(wrapper.state("amount")).toBe("");
});

test("should call onSubmit prop for valid form submission", () => {
  const onSubmitSpy = jest.fn();
  const wrapper = shallow(
    <ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />
  );
  wrapper.find("form").simulate("submit", {
    preventDefault: () => {},
  });

  expect(wrapper.state("error")).toBe("");
  expect(onSubmitSpy).toHaveBeenLastCalledWith({
    des: expenses[0].des,
    amount: expenses[0].amount,
    note: expenses[0].note,
    createdAt: expenses[0].createdAt,
  });
});

test("should set new date on date change", () => {
  const now = moment();
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find("#datePicker").prop("onDateChange")(now);
  expect(wrapper.state("createdAt")).toEqual(now);
});

test("should update calendarFocused on focus change", () => {
  const focused = false;
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find("#datePicker").prop("onFocusChange")({ focused });
  expect(wrapper.state("calendarFocused")).toEqual(focused);
});
