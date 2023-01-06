import React from "react";
import "./components/Login.css";

import Chat from "./components/chat_components/Chat";
import Login from "./components/Login";
import Paper from "@mui/material/Paper";
import NewUser from "./components/NewUser";
import CreateUserOptionPage from "./components/CreateUserOptionPage";

function App() {
  return (

    <React.Fragment>
      <Login></Login>
      <Paper>
        <Chat></Chat>
      </Paper>
      <CreateUserOptionPage></CreateUserOptionPage>
      <NewUser />
    </React.Fragment>
  );
}
export default App;
