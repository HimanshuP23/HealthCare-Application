import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Healthcare Appointment System
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/book">
          Book Appointment
        </Button>
        <Button color="inherit" component={Link} to="/doctor">
          Doctor Dashboard
        </Button>
        <Button color="inherit" component={Link} to="/patient">
          Patient History
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;