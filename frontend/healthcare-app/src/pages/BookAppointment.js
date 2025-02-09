import React from 'react';
import AppointmentForm from '../components/AppointmentForm';

const user = localStorage.getItem("user");


const BookAppointment = () => {
    console.log("Inside Bookappointment ")
    console.log(user)
    // console.log(user.userId);
    const userId = user; // Replace with actual user ID from authentication
    return <AppointmentForm userId={userId} />;
};



// const BookAppointment = () => {
//     const storedUser = localStorage.getItem("user");
//     const user = storedUser ? JSON.parse(storedUser) : null;

//     if (!user) {
//         return <p>Please log in to book an appointment.</p>;
//     }
//     console.log(storedUser)
//     console.log(user.userId)
//     return <AppointmentForm userId={user.userId} />;
// };




export default BookAppointment;