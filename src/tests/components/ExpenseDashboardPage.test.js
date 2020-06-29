import { shallow } from "enzyme"; //这个是需要config setUp的
import React from "react";
import ExpenseDashboardPage from "../../components/ExpenseDashboardPage";

test("Airbnb_enzyme: should render ExpenseDashboardPage properly", () => {
  const wrapper = shallow(<ExpenseDashboardPage />);
  expect(wrapper).toMatchSnapshot();
});
