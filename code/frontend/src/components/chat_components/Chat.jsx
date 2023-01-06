import React from "react";
import OppositeMessage from "./OppositeMessage";
import SelfMessage from "./SelfMessage";
import MediatorMessage from "./MediatorMessage";
import Panel from "./Panel";
import NavBar from "./NavBar";
import ChatBar from "./ChatBar";
import Box from "@mui/material/Box";
import "./ChatBar.css";

const Chat = () => {
  return (
    <React.Fragment>
      <Box>
        <NavBar></NavBar>
        <ChatBar></ChatBar>
        <SelfMessage></SelfMessage>
        <MediatorMessage></MediatorMessage>

        <OppositeMessage></OppositeMessage>
        <Panel></Panel>
      </Box>
    </React.Fragment>
  );
};

export default Chat;
