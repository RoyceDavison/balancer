import filterReducer from "../../redux/reducers/filterReducer";
import moment from "moment";

test("should setup default filter values", () => {
  const state = filterReducer(undefined, { type: "@@INIT" });
  expect(state).toEqual({
    text: "",
    sortBy: "date",
    startDate: moment().startOf("month"),
    endDate: moment().endOf("month"),
  });
});

test("should setup SORT_BY_AMOUNT", () => {
  const state = filterReducer(undefined, { type: "SORT_BY_AMOUNT" });

  expect(state.sortBy).toBe("amount");
});

test("should setup SORT_BY_DATE", () => {
  const currentState = {
    text: "",
    sortBy: "date",
    startDate: undefined,
    endDate: undefined,
  };
  const action = { type: "SORT_BY_DATE" };
  const state = filterReducer(currentState, action);

  expect(state.sortBy).toBe("date");
});

test("should setup SET_TEXT_FILTER", () => {
  const text = "update text";
  const action = {
    type: "SET_TEXT_FILTER",
    newText: text,
  };
  const state = filterReducer(undefined, action);

  expect(state.text).toBe(text);
});

test("should setup SET_START_DATE", () => {
  const newDate = moment(0).add(3).valueOf();
  const action = {
    type: "SET_START_DATE",
    startDate: newDate,
  };
  const state = filterReducer(undefined, action);

  expect(state.startDate).toBe(newDate);
});

test("should setup SET_END_DATE", () => {
  const newDate = moment(0);
  const action = {
    type: "SET_END_DATE",
    endDate: newDate,
  };
  const state = filterReducer(undefined, action);

  expect(state.endDate).toBe(newDate);
});
