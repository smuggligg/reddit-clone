import { connect } from "react-redux";

import LoginForm from "./../components/LoginForm";
import { loginUser } from "./../reducers/auth/action";

const mapDispatchToProps = dispatch => {
  return {
    handleSubmit: (data, cb) => loginUser(dispatch, data, cb)
  };
};

export default connect(null, mapDispatchToProps)(LoginForm);
