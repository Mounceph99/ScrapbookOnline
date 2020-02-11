import React from "react";

function PostList(props) {
  return <div>{props.renderPosts()}</div>;
}

export default PostList;
