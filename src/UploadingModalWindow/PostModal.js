import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import { Dialog, Button, IconButton} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import MuiDialogActions from '@material-ui/core/DialogActions';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import ImageIcon from '@material-ui/icons/Image';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Icon from '@material-ui/core/Icon';

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
export default function UploadPicModal()
{
    const [open, setOpen] = React.useState(false);
    const [maxWidth, setMaxWidth] = React.useState('xs');
    const [fullWidth, setFullWidth] = React.useState(true);
    const [image, setImage] =React.useState(null);
    const [alt, setAlt] = React.useState("");

    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
      setImage(null);
      setAlt("");
    };

    const displayPreview = (e) =>{

      if(e.target.files && e.target.files[0])
      {
        let reader = new FileReader();
        reader.onload = (e) => {
          setImage(e.target.result);
        };
        reader.readAsDataURL(e.target.files[0]);
        setAlt("Can't display Image");
      }
    };

    

    return(
        <div>
            {/* <IconButton onClick={handleClickOpen}>
                <AddCircleIcon style={{fontSize: 60}} color="primary"/>
            </IconButton> */}
 
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} fullWidth={fullWidth} maxWidth= {maxWidth} style={{}}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          SHARE A PICTURE
        </DialogTitle>
        <DialogContent dividers>
          <img id="selectedImg" alt={alt} height={250}  maxWidth= {maxWidth}  src={image}/>
    
        </DialogContent>
        <DialogActions>
        <React.Fragment>
            <input
            color="primary"
            accept="image/*"
            type="file"
            id="icon-button-file"
            style={{ display: 'none', }}
            onChange={displayPreview}
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
          <Button autoFocus onClick={handleClose} color="primary">
            Share
          </Button>
        </DialogActions>
      </Dialog>
        </div>
    );
}