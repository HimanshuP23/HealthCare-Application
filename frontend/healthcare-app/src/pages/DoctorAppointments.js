import React from 'react';
import DoctorDashboard from '../components/DoctorDashboard';

const doctorid = localStorage.getItem('doctorid')

const DoctorAppointments = () => {
    console.log(doctorid)
    const doctorId = doctorid; // Replace with actual doctor ID from authentication
    return <DoctorDashboard doctorId={doctorId} />;
};

export default DoctorAppointments;