//hoc === higher order component: a component(HOC) that render another components(regular component)
//why HOC? 1. reused code; 2. render hijacking; 3. prop manipulation; 4.abstract state
import React from "react";
import ReactDOM from "react-dom";

//Regular component: stateless functional component + class component
// const Info = (props) => (
//     <div>
//       <h3>Info</h3>
//       <p>The info is:{props.info}</p>
//     </div>
//   );

// ReactDOM.render(
//     <Info info="There are details" />,
//     document.getElementById("app")
//   );

const Info = (props) => (
  <div>
    <h3>Info</h3>
    <p>The info is:{props.info}</p>
  </div>
);

const withAdminWarning = (WrappedComponent) => {
  return (props) => (
    <div>
      {props.isAdmin && <h1>This is the private info. Please don't share!</h1>}
      <WrappedComponent {...props} />
    </div>
  );
};

const requiredAuthentication = (WrappedComponent) => {
  //return a hoc
  return (props) => (
    <div>
      {props.isAuthenticated ? (
        <WrappedComponent {...props} />
      ) : (
        <h1>Please Login to view the info</h1>
      )}
    </div>
  );
};

const AdminInfo_HOC = withAdminWarning(Info);
const AuthInfo = requiredAuthentication(Info);

// ReactDOM.render(
//   <AdminInfo_HOC isAdmin={true} info="There are details" />,
//   document.getElementById("app")
// );

ReactDOM.render(
  <AuthInfo isAuthenticated={false} info="There are details" />,
  document.getElementById("app")
);
