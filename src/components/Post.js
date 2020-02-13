import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CommentList from "./CommentList";
import Comment from "./Comment";

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

function Post(props) {

  const [comments, setComments] = useState([

  ]);

  const renderComments = () => {
    return comments.map((comment, index) => {
      return <Comment comment={comment} key={index}></Comment>;
    });
  };

  const addComment = () => {
    var message = document.getElementById("currentComment").value;
    //if (message == "")
    //  return;
    //comments.unshift({message: message});
    //renderComments();
    //console.log(comments);

    var listitem = document.createElement("li");
    var comment = document.createTextNode(message);
    listitem.appendChild(comment);
    document.getElementById("startcomments").appendChild(listitem);
    message = "";
  }

  const reload = () => {
    var list = document.getElementById("commentlist");
    console.log(list);
  }

  const classes = useStyles();
  
  return (
    <div className="App">
      <div style={postStyle}>
        <div className="Post">
          <div className="Header">
            <span className="UserPic">O</span>
            &nbsp;&nbsp;
            <span className="UserName">{props.post.userName}</span>
          </div>
          <div className="PostContent">
            <div className="PostPicture" style={pictureStyle}>
              <div>FILE_NAME: {props.post.picture}</div>

              <img
                style={{ width: "500px" }}
                src={require("../samplefiles/pic1.jpg")}
              />
            </div>
            <div className="PostText">{props.post.text}</div>
          </div>
          <div className="PostFooter">
            <Button
              variant="contained"
              size="large"
              color="primary"
              className={classes.margin}
              onClick={reload}
            >
              LIKE
            </Button>
          </div>
          <div className="CommentSection">
            <form>
              <input type="text" placeholder="Leave a Comment ..." id = "currentComment"></input>
              <Button
               variant="contained"
               size="small"
               color="primary"
               onClick={addComment}
              >
                Comment
              </Button>

              <ul id = "startcomments" style={listStyle}></ul>
              <CommentList renderComments={renderComments} id = "commentlist"/>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
const postStyle = {
  border: "1px solid gray",
  margin: "10px 0px 5px 0px",
  background: "#F0F8FF",
  boxShadow: "1px 1px 5px grey",
  width: "500px"
};

const pictureStyle = {
  width: "100%"
};

const listStyle = {
  listStyleType: "none",
  textAlign: "left"
}

export default Post;
