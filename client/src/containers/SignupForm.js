import { connect } from "react-redux";

import LoginForm from "./../components/LoginForm";
import { signupUser } from "./../reducers/auth/action";

const mapDispatchToProps = dispatch => {
  return {
    handleSubmit: (data, cb) => signupUser(dispatch, data, cb)
  };
};

export default connect(null, mapDispatchToProps)(LoginForm);
