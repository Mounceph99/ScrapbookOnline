import React from "react";

function Comment(props) {
return (
    <div>
    {props.comment.message}
    </div>
    )
}

export default Comment;