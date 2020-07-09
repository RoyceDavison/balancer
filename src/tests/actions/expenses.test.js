import {
  addExpense,
  removeExpense,
  editExpense,
  startAddExpense,
  setExpenses,
  startSetExpenses,
  startRemoveExpense,
  startEditExpense,
} from "../../redux/actions/expenses";
import configureStore from "redux-mock-store"; //ES6 modules
import thunk from "redux-thunk";
import expenses from "../fixtures/expenses";
import database from "../../firebase/firebase";

const createMockStore = configureStore([thunk]);

beforeEach((done) => {
  const expensesData = {};
  expenses.forEach(({ id, des, amount, note, createdAt }) => {
    expensesData[id] = { des, amount, note, createdAt };
  });
  database
    .ref("expenses")
    .set(expensesData)
    .then(() => done());
});

test("should setup addExpense object with provided values", () => {
  const action = addExpense(expenses[2]);
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: expenses[2],
  });
});

test("should add expense to database and store", (done) => {
  const store = createMockStore({});
  const expenseData = {
    des: "Mouse",
    amount: 100,
    note: "This one is cheap",
    createdAt: 1000,
  };
  store
    .dispatch(startAddExpense(expenseData))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "ADD_EXPENSE",
        expense: {
          id: expect.any(String),
          ...expenseData,
        },
      });
      return database.ref(`expenses/${actions[0].expense.id}`).once("value");
    })
    .then((snapshot) => {
      expect(snapshot.val()).toEqual(expenseData);
      done();
    });
});

test("should add expense with default to database and store", (done) => {
  const store = createMockStore({});
  const expenseDefaults = {
    des: "",
    amount: 0,
    note: "",
    createdAt: 0,
  };
  store
    .dispatch(startAddExpense({}))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "ADD_EXPENSE",
        expense: {
          id: expect.any(String),
          ...expenseDefaults,
        },
      });
      return database.ref(`expenses/${actions[0].expense.id}`).once("value");
    })
    .then((snapshot) => {
      expect(snapshot.val()).toEqual(expenseDefaults);
      done();
    });
});

// test("should setup addExpense object with default values", () => {
//   const res = { des: "", note: "", amount: 0, createdAt: 0 };

//   const action = addExpense();
//   expect(action).toEqual({
//     type: "ADD_EXPENSE",
//     expense: {
//       ...res,
//       id: expect.any(String),
//     },
//   });
// });

test("should setup removeExpense object", () => {
  const action = removeExpense({
    id: "123",
  });
  expect(action).toEqual({
    type: "REMOVE_EXPENSE",
    id: "123",
  });
});

test("should remove expense from firebase", (done) => {
  const store = createMockStore({});
  const id = expenses[2].id;
  store
    .dispatch(startRemoveExpense({ id }))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "REMOVE_EXPENSE",
        id,
      });
      return database.ref(`expense/${id}`).once("value");
    })
    .then((snapshot) => {
      expect(snapshot.val()).toBeFalsy();
      done();
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

test("should edit the expense from firebase", (done) => {
  const store = createMockStore();
  const id = expenses[0].id;
  const updates = { amount: 210 };
  store
    .dispatch(startEditExpense(id, updates))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "EDIT_EXPENSE",
        id,
        updates,
      });
      return database.ref(`expenses/${id}`).once("value");
    })
    .then((snapshot) => {
      expect(snapshot.val().amount).toBe(updates.amount);
      done();
    });
});

test("should setup expense action object with data", () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: "SET_EXPENSES",
    expenses,
  });
});

test("should fetch the expenses from firebase", (done) => {
  const store = createMockStore({});
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: "SET_EXPENSES",
      expenses,
    });
    done();
  });
});
