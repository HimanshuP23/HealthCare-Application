import React, { useEffect, useState } from 'react';
import { getAppointmentsByDoctor, updateAppointmentStatus } from '../services/api';
import { Button, Container, Typography } from '@mui/material';
import { Grid, Card, CardContent, Box } from '@mui/material';
import Header from './Home/Header';

const DoctorDashboard = ({ doctorId }) => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            const response = await getAppointmentsByDoctor(doctorId);
            setAppointments(response.data);
        };
        fetchAppointments();    
    }, [doctorId]);

    const handleStatusUpdate = async (id, appointment, status) => {
        try {
            appointment.status = status;
            await updateAppointmentStatus(id, appointment);
            setAppointments(prevAppointments =>
                prevAppointments.map(app =>
                    app.id === id ? { ...app, status } : app
                )
            );
        } catch (error) {
            console.error("Error updating appointment status:", error);
        }
    };

    return (
        <div>
            <Header />
            <Box sx={{ 
                background: 'linear-gradient(135deg, #e0f7fa, #f1f8e9)', 
                width: '100%', 
                paddingTop: '20px', 
                paddingBottom: '20px' 
            }}>
                <Container sx={{ marginTop: 4 }}>
                    <Typography variant="h4" sx={{ marginBottom: 3, fontWeight: 'bold', textAlign: 'center', color: '#1976D2' }}>
                        Doctor Dashboard
                    </Typography>

                    <Grid container spacing={3} sx={{ marginTop: 3 }}>
                        {appointments.map((appointment) => (
                            <Grid item xs={12} sm={6} md={4} key={appointment.id}>
                                <Card
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        padding: 2,
                                        boxShadow: 3,
                                        backgroundColor: appointment.status === 'CANCELLED' ? '#ffebee' : '#e3f2fd'
                                    }}
                                >
                                    <CardContent>
                                        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                                            Appointment ID: {appointment.id}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">Patient Name: {appointment.patient?.name}</Typography>
                                        <Typography variant="body2" color="text.secondary">Appointment Date: {appointment.appointmentDate}</Typography>
                                        <Typography variant="body2" color={appointment.status === 'CANCELLED' ? 'error' : 'success'}>
                                            Status: <strong>{appointment.status}</strong>
                                        </Typography>
                                    </CardContent>
                                    <Box sx={{ padding: 2 }}>
                                        <Grid container spacing={2}>
                                            {appointment.status !== 'COMPLETED' && appointment.status !== 'CANCELLED' && (
                                                <>
                                                    <Grid item xs={6}>
                                                        <Button
                                                            variant="contained"
                                                            fullWidth
                                                            color="success"
                                                            onClick={() => handleStatusUpdate(appointment.id, appointment, 'COMPLETED')}
                                                            sx={{ height: '100%' }}
                                                        >
                                                            Mark as Completed
                                                        </Button>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Button
                                                            variant="outlined"
                                                            fullWidth
                                                            color="error"
                                                            onClick={() => handleStatusUpdate(appointment.id, appointment, 'CANCELLED')}
                                                            sx={{ height: '100%' }}
                                                        >
                                                            Cancel
                                                        </Button>
                                                    </Grid>
                                                </>
                                            )}

                                            {/* When status is updated to "COMPLETED" or "CANCELLED", hide the buttons and show a message */}
                                            {(appointment.status === 'COMPLETED' || appointment.status === 'CANCELLED') && (
                                                <Grid item xs={12}>
                                                    <Typography variant="body2" color={appointment.status === 'CANCELLED' ? 'error' : 'success'}>
                                                        This appointment has been {appointment.status.toLowerCase()}.
                                                    </Typography>
                                                </Grid>
                                            )}
                                        </Grid>
                                    </Box>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>
        </div>
    );
};

export default DoctorDashboard;
