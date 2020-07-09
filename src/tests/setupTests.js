import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

//enzyme setUp
Enzyme.configure({
  adapter: new Adapter(),
});

require("dotenv").config({ path: ".env.test" });
