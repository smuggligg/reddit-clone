import { connect } from "react-redux";
import PostsPage from "./../components/PostsPage";
import { receivePosts, requestPosts } from "./../reducers/posts/action";

const mapStateToProps = state => {
  const {
    posts: { posts }
  } = state;

  return {
    posts: posts || []
  };
};

const mapDispatchToProps = dispatch => {
  return {
    receivePosts: posts => dispatch(receivePosts(posts)),
    requestPosts: () => {
      requestPosts(dispatch);
    }
  };
};

const enhancer = connect(mapStateToProps, mapDispatchToProps);

export default enhancer(PostsPage);
