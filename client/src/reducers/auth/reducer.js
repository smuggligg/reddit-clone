import cookie from "js-cookie";

import { RECEIVE_USER, LOGOUT_USER } from "./action";

const initialState = { user: {}, isLoggedIn: false };

export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_USER: {
      const { user } = action;
      return { ...state, user, isLoggedIn: true };
    }
    case LOGOUT_USER: {
      cookie.remove("token");
      return { ...state, user: {}, isLoggedIn: false };
    }
    default:
      return state;
  }
};
