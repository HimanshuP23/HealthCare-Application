import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from 'react-bootstrap';

const AppointmentList = ({ appointments }) => {
    console.log(appointments)
    return (
        <div className="container mt-4">
            <div className="table-responsive">
                <Table striped bordered hover>
                    <thead className="thead-dark">
                        <tr>
                            <th>ID</th>
                            <th>Date</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((appointment) => (
                            <tr key={appointment.id}>
                                <td>{appointment.id}</td>
                                <td>{appointment.appointmentDate}</td>
                                <td>{appointment.startTime}</td>
                                <td>{appointment.endTime}</td>
                                <td>{appointment.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default AppointmentList;
