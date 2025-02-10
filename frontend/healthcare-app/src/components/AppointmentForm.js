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
<<<<<<< Updated upstream
  import { CalendarToday, Schedule, Person } from "@mui/icons-material";
import { useLocation } from 'react-router-dom';

const AppointmentForm = ({ userId }) => {
    console.log(userId)
    const location = useLocation();
    const [appointment, setAppointment] = useState({

        doctorId: location.state?.doctorId,
=======
import { CalendarToday, Schedule, Person } from "@mui/icons-material";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const AppointmentForm = ({ userId }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [appointment, setAppointment] = useState({
        doctorId: location.state?.doctorId ? String(location.state.doctorId) : '',
        doctorName: location.state?.doctorName || '',
        consultationFee: location.state?.consultationFee || '',
        specialization: location.state?.specialization || '',
>>>>>>> Stashed changes
        startTime: '',
        endTime: '',
        appointmentDate: ''
    });
<<<<<<< Updated upstream
    
=======
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
>>>>>>> Stashed changes

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          
          const { doctorName, specialization, consultationFee, ...appointmentData } = appointment; // Exclude doctorName and specialization
          console.log("Appointment Data:", { ...appointmentData, doctorId: String(appointment.doctorId), patientId: userId });
          const response = await bookAppointment({
            ...appointmentData,
            doctorId: String(appointment.doctorId), // Ensure it's correctly formatted
            patientId: userId
          });
          console.log("Booking response:", response.data);
          // alert("Booking Successful");
          navigate('/payment', { state: { amount: consultationFee, appointmentId: response.data.id  } });
        } catch (error) {
            alert('Failed to book appointment: ' + error.message);
        }
    };

<<<<<<< Updated upstream
    return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
=======


    return (
      <Container maxWidth="sm" sx={{ mt: 5 }}>
>>>>>>> Stashed changes
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
                  label="Doctor Name"
                  value={appointment.doctorName}
                  onChange={(e) =>
                    setAppointment({ ...appointment, doctorName: e.target.value })
                  }
                  fullWidth
                  required
                  margin="normal"
                  InputProps={{
<<<<<<< Updated upstream
                    readOnly: true,
=======
                    readOnly:true,
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Specialization"
                  value={appointment.specialization}
                  onChange={(e) =>
                    setAppointment({ ...appointment, specialization: e.target.value })
                  }
                  fullWidth
                  required
                  margin="normal"
                  InputProps={{
                    readOnly:true,
>>>>>>> Stashed changes
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
                  Proceed to Payment
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>

      {/* Success Popup */}
      {showSuccessPopup && (
                <div className="success-popup">
                    <Typography variant="h6" color="success">Appointment Successfully Confirmed!</Typography>
                    <Button variant="contained" color="primary" onClick={() => setShowSuccessPopup(false)}>OK</Button>
                </div>
      )}
    </Container>
    );
};

export default AppointmentForm;
