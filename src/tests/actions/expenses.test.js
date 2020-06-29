import {
  addExpense,
  removeExpense,
  editExpense,
} from "../../redux/actions/expenses";

test("should setup addExpense object with provided values", () => {
  const res_expenseData = {
    des: "Rent",
    amount: 1000,
    createdAt: 1000,
    note: "This was the last month rent",
  };

  const action = addExpense(res_expenseData);
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: {
      ...res_expenseData,
      id: expect.any(String),
    },
  });
});

test("should setup addExpense object with default values", () => {
  const res = { des: "", note: "", amount: 0, createdAt: 0 };

  const action = addExpense();
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: {
      ...res,
      id: expect.any(String),
    },
  });
});

test("should setup removeExpense object", () => {
  const action = removeExpense({
    id: "123",
  });
  expect(action).toEqual({
    type: "REMOVE_EXPENSE",
    id: "123",
  });
});

test("should setup editExpense object", () => {
  const action = editExpense("123abc", {
    note: "new note value",
  });

  expect(action).toEqual({
    type: "EDIT_EXPENSE",
    id: "123abc",
    updates: {
      note: "new note value",
    },
  });
});
