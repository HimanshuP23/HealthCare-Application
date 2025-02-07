import React, { useState } from 'react';
import { bookAppointment } from '../services/api';
import { TextField, Button, Container, Typography } from '@mui/material';

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
        <Container>
            <Typography variant="h4">Book Appointment</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Doctor ID"
                    value={appointment.doctorId}
                    onChange={(e) => setAppointment({ ...appointment, doctorId: e.target.value })}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Start Time"
                    type="datetime-local"
                    value={appointment.startTime}
                    onChange={(e) => setAppointment({ ...appointment, startTime: e.target.value })}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    label="End Time"
                    type="datetime-local"
                    value={appointment.endTime}
                    onChange={(e) => setAppointment({ ...appointment, endTime: e.target.value })}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    label="Appointment Date"
                    type="date"
                    value={appointment.appointmentDate}
                    onChange={(e) => setAppointment({ ...appointment, appointmentDate: e.target.value })}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                />
                <Button type="submit" variant="contained" color="primary">
                    Book Appointment
                </Button>
            </form>
        </Container>
    );
};

export default AppointmentForm;