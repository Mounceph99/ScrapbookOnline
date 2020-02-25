import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Box} from "@material-ui/core";  

const useStyles = makeStyles (theme => ({
  postcontainer:{
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
}));

function PostList(props) {
  const classes = useStyles();
  return(
    <div>
      <Box display="flex" className={classes.postcontainer}>
      {props.renderPosts()}
      </Box>
    </div>
  );
  // return <div style={{border: "5px blue solid", left: "50%"}}>{props.renderPosts()}</div>;
}

export default PostList;
