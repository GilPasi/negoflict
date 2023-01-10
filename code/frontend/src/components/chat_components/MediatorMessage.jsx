import React from "react";
import Grid from "@mui/material/Grid";
import "./MediatorMessage.css";

const MediatorMessage = () => {
  return (
    <React.Fragment>
      <Grid container spacing={0} className="container">
        <Grid item sm={3} className="spacer"></Grid>

        <Grid item sm={6} className="content">
          <div className="M-circle">M</div>
          <div className="message">
            Lorem ipsum dolor sit amet consectetur, avdipisicing elit. Autem
            minus eius qui pariatur amet illo temporibus inventore cum. Soluta,
            reiciendis!
          </div>
        </Grid>

        <Grid item sm={3} xs={8} className="spacer"></Grid>
      </Grid>
    </React.Fragment>
  );
};

export default MediatorMessage;