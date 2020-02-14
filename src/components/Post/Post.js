import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Divider } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

function Post(props) {
  const classes = useStyles();


  const renderComments = () => { 
  }
  
  const handleClick = () => {
    console.log("Post.onClick => " + props.post);
  };

  const renderImage = () => {
    if(props.post.picture=='pic1'){
      return (<img
        style={{ width: "500px" }}
        src={require("../../samplefiles/pic1.jpg")}
      />)
    } else {
    return <div> <img src={`data:image/jpeg;base64,${props.post.picture}`} /></div>
    }
  }
  return (
    <div className="App">
      <div style={postStyle} onClick={e => handleClick()}>
        <div className="Post">
          <div className="Header">
            <span className="UserPic">O</span>
            &nbsp;&nbsp;
            <span className="UserName">{props.post.userName}</span>
          </div>
          <div className="PostContent">
            <div className="PostPicture" style={pictureStyle}>
              
              {renderImage()}
              
            </div>
            <div className="PostText">{props.post.text}</div>
          </div>
          <div className="PostFooter">
            <Button
              variant="contained"
              size="large"
              color="primary"
              className={classes.margin}
            >
              LIKE
            </Button>
            <input type="text" defaultValue="Leave a comment..."></input>
          </div>
          <div className="CommentSection"> 
          {props.post.comments}
        {renderComments()}
          
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

export default Post;
