import React, { useEffect, useState } from 'react';
import { getAppointmentsByDoctor, updateAppointmentStatus } from '../services/api';
import AppointmentList from './AppointmentList';
import { Button, Container, Typography } from '@mui/material';
import {  Grid, Card, CardContent, Paper, Box } from '@mui/material';


const DoctorDashboard = ({ doctorId }) => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            const response = await getAppointmentsByDoctor(doctorId);
            console.log(response.data);
            setAppointments(response.data);
        };
        fetchAppointments();    
    }, [doctorId]);

    // const handleStatusUpdate = async (id, status) => {
    //     await updateAppointmentStatus(id, status);
    //     console.log(id);
    //     console.log(status);
    //     const updatedAppointments = appointments.map(appointment =>
    //         appointment.id === id ? { ...appointment, status } : appointment
    //     );
    //     console.log(updatedAppointments);
    //     setAppointments(updatedAppointments);
    // };

    const handleStatusUpdate = async (id, appointment,status) => {
        try {
            console.log(id);
            console.log(status);
    
            // Call the API to update the appointment status
            console.log("after await");
            // Log the successful status update
            // Update the local state to reflect the change
            // const updatedAppointments = appointments.map(appointment =>
            //     appointment.id === id ? { ...appointment, status } : appointment
            // );
            appointment.status = status;
            await updateAppointmentStatus(id, appointment);
    
            // console.log(updatedAppointments);
            // setAppointments(updatedAppointments);
        } catch (error) {
            console.error("Error updating appointment status:", error);
        }
    };
    

    return (
        // <Container>
        //     <Typography variant="h4">Doctor Dashboard</Typography>
        //     <AppointmentList appointments={appointments} />
        //     {appointments.map((appointment) => (
        //         <div key={appointment.id}>
        //             <Button onClick={() => handleStatusUpdate(appointment.id,appointment,'COMPLETED')}>Completed</Button>
        //             <Button onClick={() => handleStatusUpdate(appointment.id, appointment,'CANCELLED')}>Cancel</Button>
        //         </div>
        //     ))}
        // </Container>


//         <Container sx={{ marginTop: 4 }}>
//     <Typography variant="h4" sx={{ marginBottom: 2, fontWeight: 'bold' }}>Doctor Dashboard</Typography>
    
//     <Paper sx={{ padding: 2, boxShadow: 3 }}>
//         <AppointmentList appointments={appointments} />
//     </Paper>
    
//     <Grid container spacing={2} sx={{ marginTop: 3 }}>
//         {appointments.map((appointment) => (
//             <Grid item xs={12} sm={6} md={4} key={appointment.id}>
//                 <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 2, boxShadow: 2 }}>
//                     <CardContent>
//                         <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Appointment ID: {appointment.id}</Typography>
//                         <Typography variant="body2" color="text.secondary">Patient: {appointment.patientName}</Typography>
//                         <Typography variant="body2" color="text.secondary">Status: {appointment.status}</Typography>
//                     </CardContent>
//                     <Grid container spacing={1} sx={{ padding: 2 }}>
//                         <Grid item xs={6}>
//                             <Button 
//                                 variant="contained" 
//                                 fullWidth 
//                                 color="success" 
//                                 onClick={() => handleStatusUpdate(appointment.id, appointment, 'COMPLETED')}>
//                                 Mark as Completed
//                             </Button>
//                         </Grid>
//                         <Grid item xs={6}>
//                             <Button 
//                                 variant="outlined" 
//                                 fullWidth 
//                                 color="error" 
//                                 onClick={() => handleStatusUpdate(appointment.id, appointment, 'CANCELLED')}>
//                                 Cancel
//                             </Button>
//                         </Grid>
//                     </Grid>
//                 </Card>
//             </Grid>
//         ))}
//     </Grid>
// </Container>


<Container sx={{ marginTop: 4 }}>
    <Typography variant="h4" sx={{ marginBottom: 3, fontWeight: 'bold' }}>Doctor Dashboard</Typography>
    
    <Paper sx={{ padding: 3, boxShadow: 3 }}>
        <AppointmentList appointments={appointments} />
    </Paper>
    
    <Grid container spacing={3} sx={{ marginTop: 3 }}>
        {appointments.map((appointment) => (
            <Grid item xs={12} sm={6} md={4} key={appointment.id}>
                <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 2, boxShadow: 3 }}>
                    <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>Appointment ID: {appointment.id}</Typography>
                        <Typography variant="body2" color="text.secondary">Patient: {appointment.patientName}</Typography>
                        <Typography variant="body2" color="text.secondary">Date: {appointment.date}</Typography>
                        <Typography variant="body2" color="text.secondary">Status: <strong>{appointment.status}</strong></Typography>
                    </CardContent>
                    <Box sx={{ padding: 2 }}>
                        <Grid container spacing={2}>
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
                        </Grid>
                    </Box>
                </Card>
            </Grid>
        ))}
    </Grid>
</Container>

    );
};

export default DoctorDashboard;