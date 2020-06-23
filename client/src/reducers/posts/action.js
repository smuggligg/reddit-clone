import { fetchApi } from "../api";
export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const REQUEST_POSTS = "REQUEST_POSTS";
export const REQUEST_POST = "REQUEST_POST";
export const RECEIVE_POST = "RECEIVE_POST";
export const SUBMIT_POST = "SUBMIT_POST";
export const DELETE_POST = "DELETE_POST";
export const VOTE_POST = "VOTE_POST";

export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts
});

export const requestPosts = dispatch => {
  dispatch({ type: REQUEST_POSTS });
  fetchApi({ url: "/posts" }).then(res =>
    dispatch(receivePosts(res.data.posts))
  );
};

export const requestPost = (dispatch, postId, cb = () => {}) => {
  dispatch({ type: REQUEST_POST });
  fetchApi({
    url: `/posts/${postId}`
  })
    .then(res => dispatch(receivePost(res.data.post)))
    .then(() => cb(null))
    .catch(cb);
};

export const receivePost = post => ({
  type: RECEIVE_POST,
  post
});

export const submitPost = (dispatch, data, cb) => {
  dispatch({ type: SUBMIT_POST });
  fetchApi({
    url: "/posts",
    data,
    method: "POST"
  })
    .then(res => cb(null, res))
    .then(() => requestPosts(dispatch))
    .catch(cb);
};

export const deletePost = (dispatch, postId, cb = () => {}) => {
  dispatch({ type: DELETE_POST });
  fetchApi({
    url: `/posts/${postId}`,
    method: "DELETE"
  })
    .then(() => requestPosts(dispatch))
    .then(() => cb(null))
    .catch(cb);
};

export const votePost = (dispatch, postId, value) => {
  dispatch({ type: VOTE_POST });
  const url = `/posts/${postId}/${value === 1 ? "upvote" : "downvote"}`;
  fetchApi({
    url,
    method: "POST"
  })
    .then(res => requestPost(dispatch, postId))
    .then(() => requestPosts(dispatch));
};
