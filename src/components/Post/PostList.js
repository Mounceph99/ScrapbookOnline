import React from "react";

function PostList(props) {
  return <div style={{border: "5px red solid", left: "50%"}}>{props.renderPosts()}</div>;
}

export default PostList;
