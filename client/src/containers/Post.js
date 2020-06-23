import { connect } from "react-redux";
import { withRouter } from "react-router";

import Post from "./../components/Post.js";
import { deletePost, votePost } from "./../reducers/posts/action.js";

const mapStateToProps = (state, props) => {
  const user = state.auth.user;
  const { role, userId } = user;
  const { post } = props;
  const canDelete = role === "admin" || post.author._id === userId;
  const canVote = state.auth.isLoggedIn;
  const canUpvote = !post.upVotes.includes(userId);
  const canDownvote = !post.downVotes.includes(userId);
  return { canDelete, canVote, canUpvote, canDownvote };
};

const mapDispatchToProps = dispatch => {
  return {
    deletePost: (postId, cb) => deletePost(dispatch, postId, cb),
    votePost: (postId, value) => votePost(dispatch, postId, value)
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post));
