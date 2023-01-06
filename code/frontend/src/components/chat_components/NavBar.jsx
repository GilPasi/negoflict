// import React from "react";
// import Grid from "@mui/material/Grid";
// import MenuIcon from "@mui/icons-material/Menu";

// const NavBar = () => {
//   return (
//     <React.Fragment>
//       <Grid container spacing={1} className="container">
//         <Grid item xs={3} className="spacer"></Grid>
//         <Grid item xs={1}>
//           <MenuIcon fontSize="large"></MenuIcon>
//         </Grid>

//         <Grid item xs={5} className="spacer"></Grid>

//         <Grid item xs={1}>
//           <img src="" alt="Negoflict-logo" className="logo" />
//         </Grid>
//         <Grid item xs={1} className="spacer"></Grid>
//       </Grid>
//     </React.Fragment>
//   );
// };
// export default NavBar;

import Grid from "@mui/material/Grid";
import * as React from 'react';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import MenuIcon from '@mui/icons-material/Menu';

export default function NavBar() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <Stack direction="row" spacing={2}>
      <Paper>
      </Paper>
      <div>
        <Button
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
           <MenuIcon fontSize="large"></MenuIcon>
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem onClick={handleClose}>Choose</MenuItem>
                    <MenuItem onClick={handleClose}>An</MenuItem>
                    <MenuItem onClick={handleClose}>Option</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
        <img src="" alt="Negoflict-logo" className="logo" />
      </div>
    </Stack>
  );
}
