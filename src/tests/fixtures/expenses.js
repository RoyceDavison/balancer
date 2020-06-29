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

export default expenses;
