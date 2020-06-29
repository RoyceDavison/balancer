import { v4 as uuidv4 } from "uuid";

//action generator for expenses
//ADD_EXPENSE: action generator, so action have properties: type, expense
export const addExpense = ({
  des = "",
  note = "",
  amount = 0,
  createdAt = 0,
} = {}) => {
  return {
    type: "ADD_EXPENSE",
    expense: {
      id: uuidv4(),
      des,
      note,
      amount,
      createdAt,
    },
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
