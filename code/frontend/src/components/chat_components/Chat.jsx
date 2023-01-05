import React, { useState } from "react";
import SelfMessage from "./SelfMessage";
import "./ChatBar.css";

const Chat = () => {
  return (
    <React.Fragment>
      <NavBar></NavBar>
      <ChatBar></ChatBar>
      <SelfMessage></SelfMessage>
      <Panel></Panel>
    </React.Fragment>
  );
};

export default Chat;
