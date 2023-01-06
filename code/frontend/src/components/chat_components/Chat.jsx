import React from "react";
import OppositeMessage from "./OppositeMessage";
import SelfMessage from "./SelfMessage";
import MediatorMessage from "./MediatorMessage";
import Panel from "./Panel";
import NavBar from "./NavBar";
import ChatBar from "./ChatBar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import "./ChatBar.css";

const Chat = () => {
  return (
    <React.Fragment>
      <NavBar></NavBar>
      <ChatBar></ChatBar>
      <Paper>
        <SelfMessage></SelfMessage>
        <MediatorMessage></MediatorMessage>
        <OppositeMessage></OppositeMessage>
        <Panel></Panel>
      </Paper>
    </React.Fragment>
  );
};

export default Chat;
