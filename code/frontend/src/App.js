import React from "react";
import "./components/Login.css";

import './App.css';
import Login from "./components/Login"
import Chat from "./components/chat_components/Chat"
import NewUser from "./components/NewUser"
import CreateUserOptionPage from "./components/CreateUserOptionPage"





function App() {
  return (
    <React.Fragment>
      <Login></Login>
      <Chat></Chat>
      <CreateUserOptionPage></CreateUserOptionPage>
      <NewUser></NewUser>
    </React.Fragment>

  );
}
export default App;
