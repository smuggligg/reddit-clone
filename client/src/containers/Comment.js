import { connect } from "react-redux";

import Comment from "./../components/Comment.js";
import { deleteComment, voteComment } from "./../reducers/comments/action.js";

const mapStateToProps = (state, props) => {
  const user = state.auth.user;
  const { role, userId } = user;
  const { comment } = props;
  const canDelete = role === "admin" || comment.author._id === userId;
  const canVote = state.auth.isLoggedIn;
  const canUpvote = !comment.upVotes.includes(userId);
  const canDownvote = !comment.downVotes.includes(userId);
  return { canDelete, canVote, canUpvote, canDownvote };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteComment: (commentId, cb) => deleteComment(dispatch, commentId, cb),
    voteComment: (commentId, value) => voteComment(dispatch, commentId, value)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
