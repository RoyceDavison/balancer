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

export const startRemoveExpense = ({ id } = {}) => {
  return (dispatch) => {
    return database
      .ref(`expenses/${id}`)
      .remove()
      .then(() => {
        dispatch(removeExpense({ id }));
      });
  };
};

//EDIT_EXPENSE
export const editExpense = (id, updates) => ({
  type: "EDIT_EXPENSE",
  id,
  updates,
});

export const startEditExpense = (id, updates) => {
  return (dispatch) => {
    return database
      .ref(`expenses/${id}`)
      .update(updates)
      .then(() => {
        dispatch(editExpense(id, updates));
      });
  };
};

//SET_EXPENSE
export const setExpenses = (expenses) => ({
  type: "SET_EXPENSES",
  expenses,
});

//fetch data from the firebase
export const startSetExpenses = () => {
  return (dispatch) => {
    return database
      .ref("expenses")
      .once("value")
      .then((snapshot) => {
        const expenses = [];

        snapshot.forEach((childSnapshot) => {
          expenses.push({
            id: childSnapshot.key,
            ...childSnapshot.val(),
          });
        });

        dispatch(setExpenses(expenses));
      });
  };
};
