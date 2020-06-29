import React from "react";
import Header from "../../components/Header";
// import ShallowRenderer from "react-test-renderer/shallow"; // ES6
import { shallow } from "enzyme"; //这个是需要config setUp的
//import toJSON from "enzyme-to-json"; //jest.config.json 加了snapshotSerializers之后可以不用toJSON

//shallow render --> only render given React component
//DOM render --> not only the given component but also the children of the component

//snapshot --> allow us to track the data in change over time
// test("React-test-renderer: should render Header properly", () => {
//   const renderer = new ShallowRenderer();
//   renderer.render(<Header />);
//   expect(renderer.getRenderOutput()).toMatchSnapshot();
// });

test("Airbnb_enzyme: should render Header properly", () => {
  const wrapper = shallow(<Header />);
  expect(wrapper.find("h1").length).toBe(1);
  expect(wrapper.find("h1").text()).toBe("Expensify");
  //expect(toJSON(wrapper)).toMatchSnapshot();
  expect(wrapper).toMatchSnapshot();
});
