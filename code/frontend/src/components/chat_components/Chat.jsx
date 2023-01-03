import React from "react";
import NavBar from "./NavBar";
import ChatBar from "./ChatBar";
import Panel from "./Panel";
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
