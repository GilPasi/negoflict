import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import SelfMessage from "./MediatorMessage";

import "./Panel.css";

function Panel() {
  const [content, setContent] = useState([]);
  const [msgs, setMsg] = useState([""]);
  const tb = document.querySelector("#tb");

  function handleSend() {
    const chatTexts = [...content, []];
    setContent(chatTexts);
    msgs.push(tb.value);
    setMsg(msgs);

    console.log(msgs);
    console.log(content);
  }

  return (
    <React.Fragment>
      {content.map((data, i) => {
        return (
          <Grid container className="message-container">
            <Grid item sm={1} className="spacer"></Grid>

            <Grid item sm={6} className="content">
              <div className="circle">M</div>
              <div className="message">{msgs[i]}</div>
            </Grid>
            <Grid item sm={5} className="spacer"></Grid>
          </Grid>
        );
      })}

      <Grid container name="user-input">
        <Grid item className="spacer" xs="4"></Grid>
        <Grid item className="userBar" xs="4">
          <TextField id="tb" variant="outlined" />
          <Button id="send-btn" onClick={(e) => handleSend(e)}>
            Send
          </Button>
          <p id="op"></p>
        </Grid>
        <Grid item className="spacer" xs="4"></Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Panel;
