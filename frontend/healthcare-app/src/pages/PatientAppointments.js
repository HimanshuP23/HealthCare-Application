import React from 'react';
import PatientHistory from '../components/PatientHistory';

const PatientAppointments = () => {
    const userId = localStorage.getItem("user"); // Replace with actual user ID from authentication
    return <PatientHistory userId={userId} />;
};

export default PatientAppointments;