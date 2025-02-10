import React from 'react';
import PatientHistory from '../components/PatientHistory';

// const user = localStorage.getItem("user");
const userId = localStorage.getItem("user"); // Replace with actual user ID from authentication

const PatientAppointments = () => {
    return <PatientHistory userId={userId} />;
};

export default PatientAppointments;