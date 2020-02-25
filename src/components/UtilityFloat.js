import React from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { green } from '@material-ui/core/colors';

function UtilityFloat() {
  return (
    <div style={floatStyle}>
      <Fab aria-label="add" style={{backgroundColor:green['A400']}}>
        <AddIcon />
      </Fab>
    </div>
  );
}

const floatStyle = {
  position: "fixed",
  bottom: "20px",
  right: "40px",
};

export default UtilityFloat;
