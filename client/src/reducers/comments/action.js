import { requestPost } from "./../posts/action";
import { fetchApi } from "./../api";

export const DELETE_COMMENT = "DELETE_COMMENT";
export const VOTE_COMMENT = "VOTE_COMMENT";
export const SUBMIT_COMMENT = "SUBMIT_COMMENT";

export const deleteComment = (dispatch, commentId, cb = () => {}) => {
  dispatch({ type: DELETE_COMMENT });
  fetchApi({
    url: `/comments/${commentId}`,
    method: "DELETE"
  })
    .then(res => requestPost(dispatch, res.data.postId))
    .then(() => cb(null))
    .catch(cb);
};

export const voteComment = (dispatch, commentId, value) => {
  dispatch({ type: VOTE_COMMENT });
  const url = `/comments/${commentId}/${value === 1 ? "upvote" : "downvote"}`;
  fetchApi({
    url,
    method: "POST"
  }).then(res => requestPost(dispatch, res.data.comment.post));
};

export const submitComment = (dispatch, data, cb) => {
  dispatch({ type: SUBMIT_COMMENT });
  fetchApi({
    url: "/comments",
    data,
    method: "POST"
  })
    .then(res => {
      requestPost(dispatch, res.data.comment.post);
      cb(null);
    })
    .catch(cb);
};
