import React from "react";
import "./components/Login.css";

import Chat from "./components/chat_components/Chat";
import Login from "./components/Login";
import Paper from "@mui/material/Paper";
import CreateUserOptionPage from "./components/CreateUserOptionPage";

function App() {
  return (
    <React.Fragment>
      <Login></Login>
      <Paper>
        <Chat></Chat>
        <CreateUserOptionPage></CreateUserOptionPage>
      </Paper>
    </React.Fragment>
  );
}

export default App;
