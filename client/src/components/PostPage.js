import React, { Component } from "react";
import { Div } from "glamorous";

import Post from "./../containers/Post";
import Comment from "./../containers/Comment";
import NewCommentForm from "./../containers/NewCommentForm";

class PostPage extends Component {
  componentDidMount() {
    const { requestPost, postId } = this.props;
    requestPost(postId);
  }
  render() {
    const { post, canAddComment } = this.props;
    return !post ? (
      <Div>Loading</Div>
    ) : (
      <Div>
        <Post post={post} />
        {post.text && <Div>{post.text}</Div>}
        {canAddComment && <NewCommentForm postId={post._id} />}
        <Div css={{ marginTop: 15 }}>
          {post.comments.map(comment => (
            <Comment key={comment._id} comment={comment} />
          ))}
        </Div>
      </Div>
    );
  }
}

export default PostPage;
