import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Typography } from '@mui/material';

const Home = () => {
    return (
        <Container>
            <Typography variant="h2">Welcome to Healthcare App</Typography>
            <Button component={Link} to="/book-appointment" variant="contained" color="primary">
                Book Appointment
            </Button>
            <Button component={Link} to="/doctor-appointments" variant="contained" color="secondary">
                Doctor Dashboard
            </Button>
            <Button component={Link} to="/patient-appointments" variant="contained" color="success">
                Patient History
            </Button>
        </Container>
    );
};

export default Home;