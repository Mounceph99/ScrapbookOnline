import React, { useState } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

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
function NewPostModal(props) {
  const classes = useStyles();

  const [modalStyle] = useState(getModalStyle);

  return (
    <div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={props.open}
        onClose={e => props.handleCloseNewPostModal()}
      >
        <div style={modalStyle} className={classes.paper}>
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
          <Button variant="contained" color="primary" component="label">
            Submit
            <input style={{ display: "none" }} />
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default NewPostModal;
