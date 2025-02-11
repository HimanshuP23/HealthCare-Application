import React, { useState, useEffect } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Divider,
  Box,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { Stack } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import moment from "moment";

const AppointmentSidebar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [userDetails, setUserDetails] = useState({
    username: location.state?.name,
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userDetails"));
    setUserDetails(user);
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const userData = JSON.parse(localStorage.getItem("userdata"));

  return (
    <>
      {/* Sidebar Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: 250,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: 250,
            boxSizing: "border-box",
            backgroundColor: "#f4f6f8",
            borderRight: "1px solid #e0e0e0",
            marginTop: "64px", // Push sidebar below navbar
            height: "calc(100vh - 64px)", // Adjust height to fit below navbar
          },
        }}
      >
        <List>
          <ListItem sx={{ padding: "16px", display: "flex", alignItems: "center" }}>
            <Avatar
              alt={userDetails?.name}
              src={userDetails?.photo}
              sx={{ width: 80, height: 80, marginRight: 2, boxShadow: 2 }}
            />
            <ListItemText
              primary={<Typography variant="h6">{userDetails?.name}</Typography>}
              secondary={<Typography variant="body2" color="textSecondary">{userDetails?.role}</Typography>}
            />
          </ListItem>
          <Divider sx={{ margin: "10px 0" }} />
          {/* Button to Open User Info Popup */}
          <ListItem>
            <Button variant="contained" color="primary" fullWidth onClick={handleOpen}>
              Show User Info
            </Button>
          </ListItem>
        </List>
      </Drawer>

      {/* User Info Modal */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>User Information</DialogTitle>
        <DialogContent>
          {userData ? (
            <Stack spacing={2} alignItems="center">
              <Avatar sx={{ width: 80, height: 80, bgcolor: "primary.main" }}>
                <AccountCircle sx={{ width: 60, height: 60 }} />
              </Avatar>
              <Typography variant="h6">{userData.name || "N/A"}</Typography>
              <Typography color="textSecondary">{userData.email || "No Email Provided"}</Typography>
              <Divider sx={{ width: "100%", my: 1 }} />
              <Box width="100%">
                <Typography>
                  <strong>Role:</strong> {userData.role || "Unknown"}
                </Typography>
                <Typography>
                  <strong>Phone:</strong> {userData.phoneNumber || "Not Available"}
                </Typography>
                <Typography>
                  <strong>Account Created:</strong> {moment(userData.createdAt).format("MMM DD, YYYY") || "N/A"}
                </Typography>
              </Box>
            </Stack>
          ) : (
            <Typography textAlign="center" color="error">No user information available.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AppointmentSidebar;