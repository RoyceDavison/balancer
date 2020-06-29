import { createStore, combineReducers } from "redux";
import { v4 as uuidv4 } from "uuid";

const demoState = {
  expenses: [
    {
      id: "sdfswer",
      des: "Jan. Rent",
      note: "Final payment",
      amount: 54500,
      createdAt: 0,
    },
  ],
  filters: {
    text: "rent",
    sortBy: "amount", //date of amount
    startDate: undefined,
    endDate: undefined,
  },
};

//ADD_EXPENSE: action generator, so action have properties: type, expense
const addExpense = ({
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
const removeExpense = ({ id } = {}) => ({
  type: "REMOVE_EXPENSE",
  id,
});

//EDIT_EXPENSE
const editExpense = (id, updates) => ({
  type: "EDIT_EXPENSE",
  id,
  updates,
});

//SET_TEXT_FILTER
const setTextFilter = (newText = "") => ({
  type: "SET_TEXT_FILTER",
  newText,
});

//SORT_BY_DATE
const sortByDate = () => ({
  type: "SORT_BY_DATE",
});

//SORT_BY_AMOUNT
const sortByAmount = () => ({
  type: "SORT_BY_AMOUNT",
});

//SET_START_DATE
const setStartDate = (startDate) => ({
  type: "SET_START_DATE",
  startDate,
});
//SET_END_DATE
const setEndDate = (endDate) => ({
  type: "SET_END_DATE",
  endDate,
});

//expense reducer
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

//filter reducer
const filterReducerDefaultState = {
  text: "",
  sortBy: "date",
  startDate: undefined,
  endDate: undefined,
};

const filterReducer = (state = filterReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_TEXT_FILTER":
      return {
        //filterReducer在这里是需要return 一个新的state object
        ...state,
        text: action.newText,
      };
    case "SORT_BY_DATE":
      return {
        ...state,
        sortBy: "date",
      };
    case "SORT_BY_AMOUNT":
      return {
        ...state,
        sortBy: "amount",
      };
    case "SET_START_DATE":
      return {
        ...state,
        startDate: action.startDate,
      };
    case "SET_END_DATE":
      return {
        ...state,
        endDate: action.endDate,
      };
    default:
      return state;
  }
};

//Store Creation
const store = createStore(
  combineReducers({
    expenses: expenseReducer,
    filters: filterReducer,
  })
);

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses
    .filter((expense) => {
      const startDateMatch =
        typeof startDate !== "number" || expense.createdAt >= startDate;
      const endDateMatch =
        typeof endDate !== "number" || expense.createdAt <= endDate;
      const textMatch = expense.des.toLowerCase().includes(text.toLowerCase());

      return startDateMatch && endDateMatch && textMatch;
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return a.createdAt < b.createdAt ? 1 : -1; //more recently come first
      } else if (sortBy === "amount") {
        return a.amount < b.amount ? 1 : -1;
      }
    });
};

store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  console.log(visibleExpenses);
});

const expenseOne = store.dispatch(
  addExpense({
    des: "Buy a car",
    amount: 200,
    createdAt: 1000,
  })
);

const expenseTwo = store.dispatch(
  addExpense({
    des: "Coffee + rent",
    amount: 3000,
    createdAt: -1000,
  })
);

// store.dispatch(
//   removeExpense({
//     id: expenseTwo.expense.id,
//   })
// );

// store.dispatch(editExpense(expenseOne.expense.id, { amount: 5000 }));
//store.dispatch(setTextFilter("rent"));

// store.dispatch(
//   addExpense({
//     des: "grocery",
//     amount: 10,
//   })
// );

// store.dispatch(
//   addExpense({
//     des: "cat food",
//     amount: 200,
//   })
// );

store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(0));
// store.dispatch(setEndDate(1250));
// store.dispatch(setStartDate());
