import * as React from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import "./ChatBar.css";
import Button from "@mui/material/Button";

const CustomButton = styled(Button)(() => ({
  fontWeight: "bold",
  padding: "0 100px",
  "&:hover": {
    backgroundColor: "none",
  },
}));

export default function AutoGrid() {
  const [active, setActive] = useState("main");
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={0}>
        <Grid item1 xs={0.2}></Grid>
        <Grid xs={3.8}>
          <CustomButton
            onClick={() => setActive("a")}
            sx={{
              backgroundColor: active === "a" ? "#6192e5" : "#EEEEEE",
              color: active === "a" ? "#fff" : "black",
            }}
          >
            Party A
          </CustomButton>
        </Grid>
        <Grid xs={3.8}>
          <CustomButton
            onClick={() => setActive("main")}
            sx={{
              backgroundColor: active === "main" ? "#6192e5" : "#EEEEEE",
              color: active === "main" ? "#fff" : "black",
            }}
          >
            Main
          </CustomButton>
        </Grid>
        <Grid xs={3.8}>
          <CustomButton
            onClick={() => setActive("b")}
            sx={{
              backgroundColor: active === "b" ? "#6192e5" : "#EEEEEE",
              color: active === "b" ? "#fff" : "black",
            }}
          >
            Party B
          </CustomButton>
        </Grid>
        <Grid item1 xs={0.2}></Grid>
      </Grid>
    </Box>
  );
}
