import React, { useState } from "react";
import {Drawer, Divider} from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    drawer: {
        // width: drawerWidth,
        flexShrink: 0,
      },
      drawerPaper: {
        // width: drawerWidth,
      },
      drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-start',
      },
}));
export default function CommentDrawer(){
    const classes = makeStyles();
    return(
        <div>
            <Drawer
              className={classes.drawer}
              variant="persistent"
              anchor="right"
            //   open={props.openCommentDisplay}
              classes={{
                paper: classes.drawerPaper,
              }}
            >

            </Drawer>
        </div>
    );
}