import { connect } from "react-redux";

import Header from "./../components/Header";
import { logoutUser } from "./../reducers/auth/action";

const mapStateToProps = state => {
  const {
    auth: { isLoggedIn }
  } = state;
  return { isLoggedIn };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logoutUser())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
