import { fetchApi } from "./../api";
import cookie from "js-cookie";

export const LOGIN_USER = "LOGIN_USER";
export const RECEIVE_USER = "RECEIVE_USER";
export const SIGNUP_USER = "SIGNUP_USER";
export const AUTH_USER = "AUTH_USER";
export const LOGOUT_USER = "LOGOUT_USER";

export const loginUser = (dispatch, data, cb) => {
  //Don't forget to pass it in up here!
  dispatch({ type: LOGIN_USER });
  fetchApi({
    url: "/auth/login",
    method: "POST",
    data
  })
    .then(res => {
      const { role, username, _id: userId } = res.data.user;
      updateToken(res.data.token);
      dispatch(receiveUser({ role, username, userId }));
      cb(null);
    })
    .catch(cb);
};

export const signupUser = (dispatch, data, cb) => {
  dispatch({ type: SIGNUP_USER });
  fetchApi({
    url: "/auth/signup", //Different API endpoint
    data,
    method: "POST"
  })
    .then(res => {
      const { role, username, _id: userId } = res.data.user;
      updateToken(res.data.token);
      dispatch(receiveUser({ role, username, userId }));
      cb(null);
    })
    .catch(cb);
};

export const updateToken = token => cookie.set("token", token);

export const receiveUser = user => ({
  type: RECEIVE_USER,
  user
});

export const authUser = dispatch => {
  dispatch({ type: AUTH_USER });
  fetchApi({ url: "/auth" }).then(res => {
    const { role, username, userId } = res.data.user;
    dispatch(receiveUser({ role, username, userId }));
  });
};

export const logoutUser = () => ({
  type: LOGOUT_USER
});
