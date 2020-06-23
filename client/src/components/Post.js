import React from "react";
import glam, { Div } from "glamorous";
import { Link } from "react-router-dom";
import { DateTime } from "luxon";
import { Modal } from "antd-3.5.4";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";

const { confirm } = Modal;

const showDeleteConfirm = (
  postTitle,
  postId,
  deletePost,
  redirect //Make sure to pass it in here too!
) => {
  confirm({
    title: "Are you sure you want to delete this post?",
    content: `${postTitle} will be deleted!`,
    okText: "Yes",
    okType: "danger",
    cancelText: "No",
    onOk() {
      deletePost(postId, err => {
        if (err) {
          return console.error(err);
        }
        redirect();
      });
    }
  });
};

const DeleteButton = glam.span({ cursor: "pointer" });

const PostColumn = glam.div({
  display: "flex",
  flexDirection: "column",
  marginRight: 10
});

const UpvoteIcon = glam(CaretUpOutlined)(
  {
    color: "rgba(0,0,0,0.25)",
    cursor: "pointer",
    ":hover": {
      color: "rgba(0,0,0,0.5)"
    }
  },
  ({ inactive }) =>
    inactive && {
      color: "white",
      cursor: "not-allowed",
      ":hover": { color: "white" }
    }
);

const DownvoteIcon = glam(CaretDownOutlined)(
  {
    color: "rgba(0,0,0,0.25)",
    cursor: "pointer",
    ":hover": {
      color: "rgba(0,0,0,0.5)"
    }
  },
  ({ inactive }) =>
    inactive && {
      color: "white",
      cursor: "not-allowed",
      ":hover": { color: "white" }
    }
);

const Post = props => {
  const {
    post,
    deletePost,
    canDelete,
    history,
    canVote,
    canUpvote,
    canDownvote,
    votePost
  } = props;
  const {
    _id: postId,
    title,
    text,
    url,
    author,
    comments,
    voteScore = 0,
    createdAt
  } = post;
  const postUrl = `/posts/${postId}`;
  const redirect = () => history.push("/posts");
  return (
    <Div css={{ display: "flex", alignItems: "center" }}>
      {canVote && (
        <PostColumn>
          <UpvoteIcon
            onClick={() => votePost(postId, 1)}
            inactive={!canUpvote}
          />
          <DownvoteIcon
            onClick={() => votePost(postId, -1)}
            inactive={!canDownvote}
          />
        </PostColumn>
      )}
      <PostColumn>
        <Div>
          {url ? (
            <a href={url} target="_blank">
              {title}
            </a>
          ) : (
            <Link to={postUrl}>{title}</Link>
          )}
        </Div>
        <Div css={{ fontWeight: "light", fontSize: 12 }}>
          {voteScore || 0} points{" "}
          <Link to={postUrl}>{comments.length} comments | </Link>| Posted by{" "}
          {author.username} | {DateTime.fromISO(createdAt).toLocaleString()} |{" "}
          {canDelete && (
            <DeleteButton
              onClick={() =>
                showDeleteConfirm(title, postId, deletePost, redirect)
              }
            >
              Delete
            </DeleteButton>
          )}
        </Div>
      </PostColumn>
    </Div>
  );
};

export default Post;
