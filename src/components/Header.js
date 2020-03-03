import React, { useState } from "react";
import { Link } from "react-router-dom";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { green } from '@material-ui/core/colors';
import LoginModal from "./Modal/LoginModal";

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    }
  })
);
function Header() {
  const classes = useStyles();
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const handleOpenLoginModal = () => {
    setOpenLoginModal(true);
  }
  const handleCloseLoginModal = () => {
    setOpenLoginModal(false);
  }
  return (
    <div className="App">
      <div className={classes.root} >
        <AppBar position="static" style={{backgroundColor:green['A400']}}>
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              APP
            </Typography>
            <Button onClick={handleOpenLoginModal} color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </div>
      <header style={headerStyle}>
        <div>
          <Link style={linkStyle} to="/">
            MAIN FEED
          </Link>
          &nbsp;&nbsp; | &nbsp;&nbsp;
          <Link style={linkStyle} to="/about">
            FOLLOWING
          </Link>
        </div>
      </header>
      <div className="Login-Modal">
        <LoginModal 
          open={openLoginModal}
          handleCloseLoginModal={handleCloseLoginModal}
        />        
      </div>
    </div>
  );
}

const headerStyle = {
  background: "#333", // dark gray
  color: "#fff", // white
  textAlign: "center",
  padding: "10px",

  boxShadow: "1px 1px 5px grey"
};

const linkStyle = {
  color: "white",
  textDecoration: "underline"
};

export default Header;
