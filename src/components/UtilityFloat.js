import React from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

function UtilityFloat() {
  return (
    <div style={floatStyle}>
      <Fab color="primary" aria-label="add">
        <AddIcon />
      </Fab>
    </div>
  );
}

const floatStyle = {
  position: "fixed",
  bottom: "20px",
  right: "40px"
};

export default UtilityFloat;
