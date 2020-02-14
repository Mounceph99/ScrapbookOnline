import React from "react";

function CommentList(props) {
    return <div>{props.renderComments()}</div>;
}

export default CommentList;