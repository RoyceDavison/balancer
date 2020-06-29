import expenseReducer from "../../redux/reducers/expensesReducer";
import moment from "moment";

const expenses = [
  {
    id: "1",
    des: "description1",
    amount: 1000,
    note: "",
    createdAt: 0,
  },
  {
    id: "2",
    des: "test2",
    amount: 200,
    note: "",
    createdAt: moment(0).subtract(4, "days").valueOf(),
  },
  {
    id: "3",
    des: "test3",
    amount: 300,
    note: "",
    createdAt: moment(0).add(4, "days").valueOf(),
  },
];

test("should set default state", () => {
  const state = expenseReducer(undefined, { type: "@@INIT" });
  expect(state).toEqual([]);
});

test("should remove expense by id", () => {
  const action = {
    id: expenses[0].id,
    type: "REMOVE_EXPENSE",
  };
  const state = expenseReducer(expenses, action);
  expect(state).toEqual([expenses[1], expenses[2]]);
});

test("should not remove expense if id is not found", () => {
  const action = {
    id: 567,
    type: "REMOVE_EXPENSE",
  };
  const state = expenseReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test("should add an expense", () => {
  const expense = {
    id: "10",
    des: "labtop",
    amount: 2000,
    note: "",
    createdAt: 29000,
  };
  const action = {
    expense,
    type: "ADD_EXPENSE",
  };
  const state = expenseReducer(expenses, action);
  expect(state).toEqual([...expenses, expense]);
});

test("should EDIT_EXPENSE", () => {
  const note = "hello my world";
  const amount = 888;

  const action = {
    id: expenses[0].id,
    type: "EDIT_EXPENSE",
    updates: {
      note,
      amount,
    },
  };
  const state = expenseReducer(expenses, action);
  expect(state[0].amount).toBe(amount);
  expect(state[0].note).toBe(note);
});

test("should not EDIT_EXPENSE if id is not found", () => {
  const note = "hello my world";
  const amount = 888;

  const action = {
    id: 19829,
    type: "EDIT_EXPENSE",
    updates: {
      note,
      amount,
    },
  };
  const state = expenseReducer(expenses, action);
  expect(state).toEqual(expenses);
});
