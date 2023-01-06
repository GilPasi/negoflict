import React from "react";
import "./components/Login.css";

import Chat from "./components/chat_components/Chat";
import Login from "./components/Login";
import Paper from "@mui/material/Paper";
import NewUser from "./components/NewUser";

function App() {
  return (
    <React.Fragment>
      <Login></Login>
      <Paper>
        <Chat></Chat>
      </Paper>
      <NewUser />
    </React.Fragment>
  );
}

export default App;
