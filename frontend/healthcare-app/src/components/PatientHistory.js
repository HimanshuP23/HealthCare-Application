import React, { useEffect, useState } from "react";
import { getAppointmentsByUser } from "../services/api";
import {
  Container,
  Typography,
  Avatar,
  Grid,
  Paper,
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import Navbar from "./Navbar";
import AppointmentSidebar from "./AppointmentSidebar";
import Header from "./Home/Header";
import Footer from "./Home/Footer";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Divider,
  } from "@mui/material";
  import { Stack } from "@mui/material";
  import { AccountCircle } from "@mui/icons-material";
  import moment from "moment";
  

const PatientHistory = ({ userId, userDetails }) => {
  const [appointments, setAppointments] = useState([]);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const userData = JSON.parse(localStorage.getItem("userdata"));

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await getAppointmentsByUser(userId);
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    if (userId) {
      fetchAppointments();
    }
  }, [userId]);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Header />
      <Box
        sx={{
          display: "flex",
          flex: 1,
          background: "linear-gradient(to right, #e0f7fa, #ffffff)",
          paddingBottom: "80px",
          padding: "20px",
        }}
      >
        <Container
          sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
        >
          <Paper
            elevation={4}
            sx={{ padding: "30px", borderRadius: "15px", background: "#fff" }}
          >
            <Grid
              container
              spacing={3}
              alignItems="center"
              justifyContent="center"
            >
              <Grid item>
                {userDetails && (
                  <Avatar
                    alt={userDetails.name}
                    src={userDetails.photo}
                    sx={{
                      width: 120,
                      height: 120,
                      border: "4px solid #1976d2",
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                    }}
                  />
                )}
              </Grid>
              <Grid item>
                <Typography
                  variant="h4"
                  color="primary"
                  sx={{ fontWeight: "bold" }}
                >
                  Appointment History
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  
                  onClick={handleOpen}
                >
                  Show User Info
                </Button>
              </Grid>
            </Grid>
            <Grid container spacing={3} sx={{ mt: 4 }}>
              {appointments.length > 0 ? (
                appointments.map((appt) => (
                  <Grid item xs={12} sm={6} md={4} key={appt.id}>
                    <Card
                      elevation={5}
                      sx={{
                        borderRadius: "15px",
                        textAlign: "center",
                        transition: "0.3s",
                        "&:hover": { transform: "scale(1.05)" },
                      }}
                    >
                      <CardContent>
                        <Typography variant="h6" color="primary">
                          {appt.appointmentDate}
                        </Typography>
                        <Typography variant="body1">
                          Doctor: {appt.doctor.user.name}
                        </Typography>
                        <Typography variant="body1">
                          Specialization: {appt.doctor.specialization}
                        </Typography>
                        <Typography variant="body1">
                          Time: {appt.startTime} - {appt.endTime}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color:
                              appt.status === "COMPLETED"
                                ? "green"
                                : appt.status === "SCHEDULED"
                                ? "blue"
                                : "red",
                            fontWeight: "bold",
                          }}
                        >
                          Status: {appt.status}
                        </Typography>
                      </CardContent>
                      <CardActions sx={{ justifyContent: "center" }}>
                        {/* <Button variant="contained" color="primary" size="small">
                          View Details
                        </Button> */}
                      </CardActions>
                    </Card>
                  </Grid>
                ))
              ) : (
                <Typography
                  sx={{
                    textAlign: "center",
                    width: "100%",
                    fontSize: "18px",
                    color: "gray",
                  }}
                >
                  No appointments available
                </Typography>
              )}
            </Grid>
          </Paper>
        </Container>
      </Box>
      <Footer />

      {/* User Info Modal */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>
          User Information
        </DialogTitle>
        <DialogContent>
          {userData ? (
            <Stack spacing={2} alignItems="center">
              <Avatar sx={{ width: 80, height: 80, bgcolor: "primary.main" }}>
                <AccountCircle sx={{ width: 60, height: 60 }} />
              </Avatar>
              <Typography variant="h6">{userData.name || "N/A"}</Typography>
              <Typography color="textSecondary">
                {userData.email || "No Email Provided"}
              </Typography>
              <Divider sx={{ width: "100%", my: 1 }} />
              <Box width="100%">
                <Typography>
                  <strong>Role:</strong> {userData.role || "Unknown"}
                </Typography>
                <Typography>
                  <strong>Phone:</strong>{" "}
                  {userData.phoneNumber || "Not Available"}
                </Typography>
                <Typography>
                  <strong>Account Created:</strong>{" "}
                  {moment(userData.createdAt).format("MMM DD, YYYY") || "N/A"}
                </Typography>
              </Box>
            </Stack>
          ) : (
            <Typography textAlign="center" color="error">
              No user information available.
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PatientHistory;
