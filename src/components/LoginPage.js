import React from "react";
import { connect } from "react-redux";
import { startLogin } from "../redux/actions/auth";

export const LoginPage = ({ startLogin }) => (
  <div className="box-layout">
    <div className="box-layout__box">
      <h1 className="box-layout__title">Balancer</h1>
      <p>Track your everyday spending.</p>
      <button className="button" onClick={startLogin}>
        Login
      </button>
    </div>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  startLogin: () => dispatch(startLogin()),
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
