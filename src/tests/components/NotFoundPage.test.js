import React from "react";
import NotFoundPage from "../../components/NotFoundPage";
import { shallow } from "enzyme"; //这个是需要config setUp的

test("Airbnb_enzyme: should render NotFoundPage properly", () => {
  const wrapper = shallow(<NotFoundPage />);
  expect(wrapper).toMatchSnapshot();
});
