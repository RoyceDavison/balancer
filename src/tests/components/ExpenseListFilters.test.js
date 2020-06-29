import { shallow } from "enzyme"; //这个是需要config setUp的
import React from "react";
import moment from "moment";
import { ExpenseListFilters } from "../../components/TestExpenseListFilters";
import { filter1, filter2 } from "../fixtures/filters";

let setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate, wrapper;

beforeEach(() => {
  setTextFilter = jest.fn();
  sortByAmount = jest.fn();
  sortByDate = jest.fn();
  setStartDate = jest.fn();
  setEndDate = jest.fn();

  wrapper = shallow(
    <ExpenseListFilters
      filters={filter1}
      setTextFilter={setTextFilter}
      sortByAmount={sortByAmount}
      sortByDate={sortByDate}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
    />
  );
});

test("should render ExpenseListFilters correctly", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should handle text change", () => {
  const value = "bills";
  wrapper.find("input").simulate("change", {
    target: {
      value,
    },
  });
  expect(setTextFilter).toHaveBeenLastCalledWith(value);
});

// test("should sort by date", () => {
//   const value = "date";
//   wrapper.setProps({
//     filters: filter2,
//   });
//   wrapper.find("select").simulate("change", {
//     target: value,
//   });
//   expect(sortByDate).toHaveBeenCalled();
// });

// test("should sort by amount", () => {
//   const value = "amount";
//   wrapper.find("select").simulate("change", {
//     target: value,
//   });
//   expect(sortByAmount).toHaveBeenCalled();
// });

test("should handle date changes", () => {
  const startDate = moment(0).add(4, "days");
  const endDate = moment(0).add(8, "years");

  wrapper.find(".DateRangePicker").prop("onDatesChange")({
    startDate,
    endDate,
  });
  expect(setStartDate).toHaveBeenLastCalledWith(startDate);
  expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});

test("should handle date focus change", () => {
  const calendarFocused = "endDate";
  wrapper.find(".DateRangePicker").prop("onFocusChange")(calendarFocused);
  expect(wrapper.state("calendarFocused")).toBe(calendarFocused);
});
