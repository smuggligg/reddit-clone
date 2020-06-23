import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App";
import postsReducer from "./reducers/posts/reducer";
import commentsReducer from "./reducers/comments/reducer";
import authReducer from "./reducers/auth/reducer"; //Import the auth reducer
import { authUser } from "./reducers/auth/action";
import registerServiceWorker from "./registerServiceWorker";

const reducer = combineReducers({
  posts: postsReducer,
  comments: commentsReducer,
  auth: authReducer
});

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

authUser(store.dispatch);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
