import React, { useEffect, useState } from 'react';
import { getAppointmentsByUser } from '../services/api';
import AppointmentList from './AppointmentList';
import { Container, Typography } from '@mui/material';

const PatientHistory = ({ userId }) => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            const response = await getAppointmentsByUser(userId);
            setAppointments(response.data);
        };
        fetchAppointments();
    }, [userId]);

    return (
        <Container>
            <Typography variant="h4">Appointment History</Typography>
            <AppointmentList appointments={appointments} />
        </Container>
    );
};

export default PatientHistory;