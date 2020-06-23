import React from "react";
import { Div, H3 } from "glamorous";

import NewPostForm from "./../containers/NewPostForm";

const NewPostPage = ({ history }) => (
  <Div>
    <H3>Add a new post</H3>
    <NewPostForm redirect={postId => history.push(`/posts/${postId}`)} />
  </Div>
);

export default NewPostPage;
