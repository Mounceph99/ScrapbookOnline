import React, { useState, useEffect } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Dialog, Button, IconButton, TextField} from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import MuiDialogActions from '@material-ui/core/DialogActions';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import { green } from '@material-ui/core/colors';
import axios from 'axios';

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },

});
const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);


const PostDescription = withStyles({
  root: {
    "& label.Mui-focused": {
      color:green['A400']
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: green['A400']
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "red"
      },
      "&:hover fieldset": {
        borderColor: "yellow"
      },
      "&.Mui-focused fieldset": {
        borderColor: green['A400']
      }
    }
  }
})(TextField);

// function rand() {
//   return Math.round(Math.random() * 20) - 10;
// }

// function getModalStyle() {
//   const top = 50 + rand();
//   const left = 50 + rand();

//   return {
//     top: `${top}%`,
//     left: `${left}%`,
//     transform: `translate(-${top}%, -${left}%)`
//   };
// }

const useStyles = makeStyles(theme =>
  createStyles({
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3)
    }
  })
);

const ColorButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(green['A400']),
    backgroundColor: green['A400'],
    '&:hover': {
      backgroundColor: green['A400'],
    },
  },
}))(Button);
function NewPostModal(props) {
  // const classes = useStyles();

  // const [modalStyle] = useState(getModalStyle);
  const [image, setImage] =React.useState(null);
  const [alt, setAlt] = React.useState("");
  // const [description, setDescription] = React.useState(null);


  // const handleChange = (e) => {
  //   console.log("handleChange()") 
  //   console.log(URL.createObjectURL(e.target.files[0]))
  //   props.setFile(URL.createObjectURL(e.target.files[0]))  
  // } 

  const userPostDescription = (e)=>{
    props.setDescription(e.target.value);
    console.log(props.description);

  };
  
  const displayPreview = (e) =>{

    if(e.target.files && e.target.files[0])
    {
      let reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
        props.setFile(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
      setAlt("Can't display Image");
    }
  };

  // useEffect(()=>{

  //   const newPostData ={

  //   };
  //   axios.post('https://us-central1-socialplatform-801be.cloudfunctions.net/api/newPost',newPostData);

  // });

  return (
    <div>
      <Dialog
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={props.open}
        onClose={e => props.handleCloseNewPostModal()}
        fullWidth={true} 
        maxWidth= {'xs'}
      >
        <DialogTitle id="customized-dialog-title" onClose={e => props.handleCloseNewPostModal()}>
          SHARE A PICTURE
        </DialogTitle>
     
        <DialogContent dividers>
          <DialogActions >
            <PostDescription fullWidth={true} label="Description"/>
          </DialogActions>
          <img id="selectedImg" alt={alt} height={250}  maxWidth= {'xs'}  src={image}/>
    
        </DialogContent>
        <DialogActions>
        <React.Fragment>
            <input
            color="primary"
            accept="image/*"
            type="file"
            id="icon-button-file"
            style={{ display: 'none', }}
            // onChange={handleChange}
            onChange={displayPreview}
            />

            <label htmlFor="icon-button-file">
            <ColorButton
                variant="contained"
                component="span"
                size="large"
            >
                <ImageIcon/>
            </ColorButton>
            </label>
            </React.Fragment>
          <ColorButton variant="contained" component="label" onClick={e => props.addPosts()}>
            Share
          </ColorButton>
        </DialogActions>


        {/* <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">NEW_POST_MODAL</h2>
          <p id="simple-modal-description">description</p>

          <Button variant="contained" component="label">
            Upload Picture
            <input type="file" style={{ display: "none" }} />
          </Button>
          <TextField
            id="outlined-multiline-static"
            label="Comment"
            multiline
            rows="4"
            variant="outlined"
            style={{ width: "100%" }}
          />
            <React.Fragment>
            <input
            color="primary"
            accept="image/*"
            type="file"
            id="icon-button-file"
            style={{ display: 'none', }}
            onChange={handleChange}
            />

            <label htmlFor="icon-button-file">
            <Button
                variant="contained"
                component="span"
                size="large"
                color="primary"
            >
                <ImageIcon/>
            </Button>
            </label>
            </React.Fragment>
          <Button variant="contained" color="primary" component="label" onClick={e => props.addPosts()}>
            Share
          </Button>
        </div> */}
      </Dialog>
    </div>
  );
}

export default NewPostModal;
