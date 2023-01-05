import React from "react";
import SelfMessage from "./SelfMessage";
import NavBar from "./NavBar";
import ChatBar from "./ChatBar";
import Panel from "./Panel";
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
