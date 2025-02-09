import React from 'react';
import DoctorDashboard from '../components/DoctorDashboard';

const doctorid = localStorage.getItem('doctorid')

const DoctorAppointments = () => {
<<<<<<< Updated upstream
    console.log(doctorid)
    const doctorId = doctorid; // Replace with actual doctor ID from authentication
=======
    const doctorId = 3; // Replace with actual doctor ID from authentication
>>>>>>> Stashed changes
    return <DoctorDashboard doctorId={doctorId} />;
};

export default DoctorAppointments;