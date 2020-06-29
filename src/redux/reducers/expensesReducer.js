const expenseReducerDefaultState = [];

const expenseReducer = (state = expenseReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      //return state.concat([action.expense]);
      //spread operator, both it and concat() does not modify the original array
      return [...state, action.expense];
    case "REMOVE_EXPENSE":
      //   return state.filter((expense) => {
      //     return expense.id !== action.id;
      //   });
      return state.filter(({ id }) => {
        return id !== action.id;
      });
    case "EDIT_EXPENSE":
      return state.map((expense) => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updates,
          };
        } else {
          return expense;
        }
      });
    default:
      return state;
  }
};

export default expenseReducer;
