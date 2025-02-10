import React from 'react';
import AppointmentForm from '../components/AppointmentForm';

const user = localStorage.getItem("user");

const BookAppointment = () => {
    const userId = user;
    return <AppointmentForm userId={userId} />;
};

export default BookAppointment;