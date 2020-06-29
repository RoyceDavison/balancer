import moment from "moment";

const filter1 = {
  text: "test1",
  sortBy: "date",
  startDate: undefined,
  endDate: undefined,
};

const filter2 = {
  text: "test2",
  sortBy: "amount",
  startDate: moment(0),
  endDate: moment(0).add(3, "days"),
};

export { filter1, filter2 };
