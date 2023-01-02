import React from "react";
import Grid from "@mui/material/Grid";
import MenuIcon from "@mui/icons-material/Menu";

const NavBar = () => {
  return (
    <React.Fragment>
      <Grid container spacing={1} className="container">
        <Grid item xs={3} className="spacer"></Grid>
        <Grid item xs={1}>
          <MenuIcon fontSize="large"></MenuIcon>
        </Grid>

        <Grid item xs={5} className="spacer"></Grid>

        <Grid item xs={1}>
          <img src="" alt="Negoflict-logo" className="logo" />
        </Grid>
        <Grid item xs={1} className="spacer"></Grid>
      </Grid>
    </React.Fragment>
  );
};
export default NavBar;
