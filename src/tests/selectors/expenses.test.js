import selectExpenses from "../../redux/selectors/expenses";
import moment from "moment";

const expenses = [
  {
    id: "1",
    des: "description1",
    amount: 1000,
    note: "",
    createdAt: 0,
  },
  {
    id: "2",
    des: "test2",
    amount: 200,
    note: "",
    createdAt: moment(0).subtract(4, "days").valueOf(),
  },
  {
    id: "3",
    des: "test3",
    amount: 300,
    note: "",
    createdAt: moment(0).add(4, "days").valueOf(),
  },
];

test("should filter by test value", () => {
  const filters = {
    text: "test",
    sortBy: "date",
    startDate: undefined,
    endDate: undefined,
  };

  const result = selectExpenses(expenses, filters);
  expect(result).toEqual([expenses[2], expenses[1]]);
});

test("should filter by startDate", () => {
  const filters = {
    text: "",
    sortBy: "date",
    startDate: moment(0),
    endDate: undefined,
  };

  const result = selectExpenses(expenses, filters);
  expect(result).toEqual([expenses[2], expenses[0]]);
});

test("should filter by endDate", () => {
  const filters = {
    text: "",
    sortBy: "date",
    startDate: undefined,
    endDate: moment(0),
  };

  const result = selectExpenses(expenses, filters);
  expect(result).toEqual([expenses[0], expenses[1]]);
});

test("should filter by date", () => {
  const filters = {
    text: "",
    sortBy: "date",
    startDate: undefined,
    endDate: undefined,
  };

  const result = selectExpenses(expenses, filters);
  expect(result).toEqual([expenses[2], expenses[0], expenses[1]]);
});

test("should filter by amount", () => {
  const filters = {
    text: "",
    sortBy: "amount",
    startDate: undefined,
    endDate: undefined,
  };

  const result = selectExpenses(expenses, filters);
  expect(result).toEqual([expenses[0], expenses[2], expenses[1]]);
});
