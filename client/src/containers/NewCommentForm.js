import { connect } from "react-redux";

import NewCommentForm from "./../components/NewCommentForm";
import { submitComment } from "./../reducers/comments/action";

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    handleSubmit: (values, cb) => submitComment(dispatch, values, cb)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewCommentForm);
