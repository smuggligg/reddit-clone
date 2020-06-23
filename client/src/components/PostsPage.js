import React, { Component } from "react";
import { Div } from "glamorous";
import Post from "./../containers/Post";

class PostsPage extends Component {
  componentDidMount() {
    this.props.requestPosts();
  }
  render() {
    const { posts } = this.props;
    console.log("rendering posts!", posts);
    return (
      <Div>
        {posts.map(post => (
          <Post key={post._id} post={post} />
        ))}
      </Div>
    );
  }
}

export default PostsPage;
