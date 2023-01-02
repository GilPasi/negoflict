import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import NavBar from "./chat_components/NavBar";
import SelfMessage from "./chat_components/SelfMessage";
import ToolsBar from "./chat_components/ToolsBar";

import Panel from "./chat_components/Panel";
import "./Chat.css";

const Chat = () => {
  return (
    <React.Fragment className="page-wrapper">
      <Grid container>
        <Grid item xs={2} className="chat-spacer"></Grid>
        <Grid item xs={8} className="chat-content">
          <Paper className="frame" elevation="5">
            <NavBar></NavBar>
            <Grid item xs={2} className="chat-spacer"></Grid>
            <ToolsBar></ToolsBar>
            <Panel></Panel>
          </Paper>
        </Grid>
        <Grid item xs={2} className="chat-spacer"></Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Chat;
