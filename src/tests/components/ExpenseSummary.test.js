import React from "react";
import { shallow } from "enzyme";
import { ExpenseSummary } from "../../components/ExpenseSummary";

test("Should correctly render ExpenseSummary with 1 expense", () => {
  const wrapper = shallow(
    <ExpenseSummary expenseCount={1} expenseTotal={235} />
  );
  expect(wrapper).toMatchSnapshot();
});

test("Should correctly render ExpenseSummary with multiple expenses", () => {
  const wrapper = shallow(
    <ExpenseSummary expenseCount={23} expenseTotal={320984930} />
  );
  expect(wrapper).toMatchSnapshot();
});
