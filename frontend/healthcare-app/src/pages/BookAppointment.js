import React from 'react';
import AppointmentForm from '../components/AppointmentForm';

const BookAppointment = () => {
    const userId = 4; // Replace with actual user ID from authentication
    return <AppointmentForm userId={userId} />;
};

export default BookAppointment;