import React from "react";
import { Div, H3 } from "glamorous";
import LoginForm from "./../containers/LoginForm";
import SignupForm from "./../containers/SignupForm";

const LoginPage = props => {
  const { history } = props;
  const redirect = () => history.push("/posts");
  return (
    <Div>
      <H3>Login</H3>
      <LoginForm type="login" redirect={redirect} />
      <H3>Signup</H3>
      <SignupForm type="signup" redirect={redirect} />
    </Div>
  );
};
export default LoginPage;
