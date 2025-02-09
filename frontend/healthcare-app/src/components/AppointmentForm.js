import React, { useState } from 'react';
import { bookAppointment } from '../services/api';
import {
    Container,
    TextField,
    Button,
    Typography,
    Card,
    CardContent,
    Grid,
    InputAdornment,
  } from "@mui/material";
  import { CalendarToday, Schedule, Person } from "@mui/icons-material";

const AppointmentForm = ({ userId }) => {
    console.log(userId)
    const [appointment, setAppointment] = useState({
        doctorId: '',
        startTime: '',
        endTime: '',
        appointmentDate: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(appointment)
            const response = await bookAppointment({ ...appointment, patientId:userId });
            alert('Appointment booked successfully!');
        } catch (error) {
            alert('Failed to book appointment: ' + error.message);
        }
    };

    return (
        // <Container>
        //     <Typography variant="h4">Book Appointment</Typography>
        //     <form onSubmit={handleSubmit}>
        //         <TextField
        //             label="Doctor ID"
        //             value={appointment.doctorId}
        //             onChange={(e) => setAppointment({ ...appointment, doctorId: e.target.value })}
        //             fullWidth
        //             margin="normal"
        //         />
        //         <TextField
        //             label="Start Time"
        //             type="time"
        //             value={appointment.startTime}
        //             onChange={(e) => setAppointment({ ...appointment, startTime: e.target.value })}
        //             fullWidth
        //             margin="normal"
        //             InputLabelProps={{ shrink: true }}
        //         />
        //         <TextField
        //             label="End Time"
        //             type="time"
        //             value={appointment.endTime}
        //             onChange={(e) => setAppointment({ ...appointment, endTime: e.target.value })}
        //             fullWidth
        //             margin="normal"
        //             InputLabelProps={{ shrink: true }}
        //         />
        //         <TextField
        //             label="Appointment Date"
        //             type="date"
        //             value={appointment.appointmentDate}
        //             onChange={(e) => setAppointment({ ...appointment, appointmentDate: e.target.value })}
        //             fullWidth
        //             margin="normal"
        //             InputLabelProps={{ shrink: true }}
        //         />
        //         <Button type="submit" variant="contained" color="primary">
        //             Book Appointment
        //         </Button>
        //     </form>
        // </Container>

        <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Card elevation={4} sx={{ p: 3, borderRadius: 2 }}>
        <CardContent>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            color="primary"
            fontWeight="bold"
          >
            Book an Appointment
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Doctor ID"
                  value={appointment.doctorId}
                  onChange={(e) =>
                    setAppointment({ ...appointment, doctorId: e.target.value })
                  }
                  fullWidth
                  required
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Start Time"
                  type="time"
                  value={appointment.startTime}
                  onChange={(e) =>
                    setAppointment({ ...appointment, startTime: e.target.value })
                  }
                  fullWidth
                  required
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Schedule />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="End Time"
                  type="time"
                  value={appointment.endTime}
                  onChange={(e) =>
                    setAppointment({ ...appointment, endTime: e.target.value })
                  }
                  fullWidth
                  required
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Schedule />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Appointment Date"
                  type="date"
                  value={appointment.appointmentDate}
                  onChange={(e) =>
                    setAppointment({
                      ...appointment,
                      appointmentDate: e.target.value,
                    })
                  }
                  fullWidth
                  required
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarToday />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2, py: 1.5, fontSize: "16px" }}
                >
                  Confirm Appointment
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Container>
    );
};

export default AppointmentForm;