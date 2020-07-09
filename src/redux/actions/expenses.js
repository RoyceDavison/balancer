import { v4 as uuidv4 } from "uuid";
import database from "../../firebase/firebase";

//action generator for expenses
//ADD_EXPENSE: action generator, so action have properties: type, expense
export const addExpense = (expense) => ({
  type: "ADD_EXPENSE",
  expense,
});

//return a function since we have used middleware for redux so it will work
//but in general, action generator return an object
export const startAddExpense = (expenseData = {}) => {
  return (dispatch) => {
    const { des = "", note = "", amount = 0, createdAt = 0 } = expenseData;
    const expense = { des, note, amount, createdAt };
    return database
      .ref("expenses")
      .push(expense)
      .then((ref) => {
        dispatch(
          addExpense({
            id: ref.key,
            ...expense,
          })
        );
      });
  };
};

//REMOVE_EXPENSE
export const removeExpense = ({ id } = {}) => ({
  type: "REMOVE_EXPENSE",
  id,
});

//EDIT_EXPENSE
export const editExpense = (id, updates) => ({
  type: "EDIT_EXPENSE",
  id,
  updates,
});
