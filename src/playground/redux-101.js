import { createStore } from "redux";
//Reducer: 1. Reducer are pure functions
//(which means the output is only depended on the input
//--> we don't want to change thing outside of the function scope)
//2. never directly change state or action

const countReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case "INCREMENT":
      const incrementBy =
        typeof action.incrementBy === "number" ? action.incrementBy : 1;
      return {
        count: state.count + action.incrementBy,
      };
    case "DECREMENT":
      const decrementBy =
        typeof action.decrementBy === "number" ? action.decrementBy : 1;
      return {
        count: state.count - action.decrementBy,
      };
    case "RESET":
      return {
        count: 0,
      };
    case "SET":
      return {
        count: action.count,
      };
    default:
      return state;
  }
};

//Action is a way to communicate with store, it is an object passed via dispatch()
const store = createStore(countReducer);

//watch for store change
store.subscribe((user) => {
  console.log(store.getState());
});

//Action Generators - function that return action object
// const increamentCount = (payload = {}) => {
//   return {
//     type: "INCREMENT",
//     increamentBy:
//       typeof payload.increamentBy === "number" ? payload.increamentBy : 1,
//   };
// };

//destructuring an object and set default to be 1
const increamentCount = ({ incrementBy = 1 } = {}) => {
  return {
    type: "INCREMENT",
    incrementBy,
  };
};

const decrementCount = ({ decrementBy = 10 } = {}) => {
  return {
    type: "DECREMENT",
    decrementBy,
  };
};

const resetCount = () => {
  return {
    type: "RESET",
  };
};

const setCount = ({ count = -100 } = {}) => {
  return {
    type: "SET",
    count,
  };
};
//stop watching
// const unsubscribe = store.subscribe(() => {
//   console.log(store.getState());
// });

// store.dispatch({
//   type: "INCREMENT",
//   increamentBy: 5,
// });
// // unsubscribe();

store.dispatch(
  increamentCount({
    incrementBy: 3,
  })
);

store.dispatch(
  decrementCount({
    decrementBy: 10,
  })
);

// store.dispatch({
//   type: "INCREMENT",
// });

// store.dispatch({
//   type: "RESET",
// });
store.dispatch(resetCount());

// store.dispatch({
//   type: "DECREMENT",
//   decreamentBy: 10,
// });

// store.dispatch({
//   type: "SET",
//   count: 101,
// });
store.dispatch(setCount({ count: 101 }));
