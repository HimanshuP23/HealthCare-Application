import React, { useState } from 'react';
import { bookAppointment, sendNotification } from '../services/api';
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
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Header from './Home/Header';
import Footer from './Home/Footer';

const AppointmentForm = ({ userId }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [appointment, setAppointment] = useState({
        doctorId: location.state?.doctorId ? String(location.state.doctorId) : '',
        doctorName: location.state?.doctorName || '',
        consultationFee: location.state?.consultationFee || '',
        specialization: location.state?.specialization || '',
        startTime: '',
        endTime: '',
        appointmentDate: ''
    });
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const user = JSON.parse(localStorage.getItem("userobj"));

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
          // Send notification to the user (both email and SMS will be sent by backend)
          const notificationMessage =  `Hey ${user.name}, Thankyou for showing interest in booking appointment with Dr.${doctorName}(${specialization}) through CareBuddy. Complete the payment of Rs.${consultationFee} to confirm your appointment.
Regards,
Team CareBuddy.`;
          await sendNotification(userId, notificationMessage);
          // setShowSuccessPopup(true);
          navigate('/payment', { state: { amount: consultationFee, appointmentId: response.data.id, appointmentDate: response.data.appointmentDate, startTime: response.data.startTime, endTime: response.data.endTime, status: response.data.status,
            doctorId: location.state?.doctorId ? String(location.state.doctorId) : '',
            doctorName: location.state?.doctorName || '',
            specialization: location.state?.specialization || '',
            consultationFee: location.state?.consultationFee || ''  } });
        } catch (error) {
            alert('Failed to book appointment: ' + error.message);
        }
    };



    return (
      <div>
        <Header></Header>
      <Container maxWidth="sm" sx={{ mt: 5, mb: 15 }}>
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
    <Footer></Footer>
    </div>
    );
};

export default AppointmentForm;
