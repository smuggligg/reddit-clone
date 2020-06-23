import { connect } from "react-redux";

import { submitPost } from "./../reducers/posts/action";
import NewPostForm from "./../components/NewPostForm";

const mapStateToProps = null;

const mapDispatchToProps = dispatch => {
  return {
    handleSubmit: (data, cb) => submitPost(dispatch, data, cb)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPostForm);
