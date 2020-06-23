import { connect } from "react-redux";

import PostPage from "./../components/PostPage";
import { requestPost } from "./../reducers/posts/action";

const mapStateToProps = (state, props) => {
  const {
    match: {
      params: { postId }
    }
  } = props;
  const {
    posts: { post },
    auth: { isLoggedIn }
  } = state;
  return { post, postId, canAddComment: isLoggedIn };
};

const mapDispatchToProps = dispatch => {
  return {
    requestPost: (postId, cb) => requestPost(dispatch, postId, cb)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);
