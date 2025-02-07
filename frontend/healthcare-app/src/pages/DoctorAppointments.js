import React from 'react';
import DoctorDashboard from '../components/DoctorDashboard';

const DoctorAppointments = () => {
    const doctorId = 1; // Replace with actual doctor ID from authentication
    return <DoctorDashboard doctorId={doctorId} />;
};

export default DoctorAppointments;