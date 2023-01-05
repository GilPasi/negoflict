import React, { useState } from "react";
import SelfMessage from "./SelfMessage";
import Box from "@mui/material/Box";
import "./ChatBar.css";

const Chat = () => {
  return (
    <React.Fragment>
        <Box >
      <NavBar></NavBar>
      <ChatBar></ChatBar>
      <SelfMessage></SelfMessage>
      <Panel></Panel>
        </Box>
    </React.Fragment>
  );
};

export default Chat;
