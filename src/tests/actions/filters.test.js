import {
  setStartDate,
  setEndDate,
  sortByAmount,
  sortByDate,
  setTextFilter,
} from "../../redux/actions/filters";
import moment from "moment";

test("should generate setStartDate object", () => {
  const action = setStartDate(moment(0));

  expect(action).toEqual({
    type: "SET_START_DATE",
    startDate: moment(0),
  });
});

test("should generate setEndDate object", () => {
  const action = setEndDate(moment(0));

  expect(action).toEqual({
    type: "SET_END_DATE",
    endDate: moment(0),
  });
});

test("should generate setTextFilter object", () => {
  const action = setTextFilter("should have sth");
  expect(action).toEqual({
    type: "SET_TEXT_FILTER",
    newText: "should have sth",
  });
});

test("should generate setTextFilter object(default)", () => {
  const action = setTextFilter();
  expect(action).toEqual({
    type: "SET_TEXT_FILTER",
    newText: "",
  });
});

test("should generate sortByAmount object", () => {
  expect(sortByAmount()).toEqual({
    type: "SORT_BY_AMOUNT",
  });
});

test("should generate sortByDate object", () => {
  expect(sortByDate()).toEqual({
    type: "SORT_BY_DATE",
  });
});
