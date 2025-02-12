// AdminHomePanel.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';

// Material UI components
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

export default function AdminHomePanel() {
  // State variables for counts
  const [patientCount, setPatientCount] = useState(0);
  const [doctorCount, setDoctorCount] = useState(0);
  const [scheduledCount, setScheduledCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [cancelledCount, setCancelledCount] = useState(0);
  const [paymentCompletedCount, setPaymentCompletedCount] = useState(0);
  const [paymentPendingCount, setPaymentPendingCount] = useState(0);
  const urls = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const token = localStorage.getItem('token');

    // Fetch Total Patients Count
    axios
      .get(`${urls}/users/patients/count`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setPatientCount(response.data);
      })
      .catch((error) => {
        console.error('Error fetching patient count:', error);
      });

    // Fetch Total Doctors Count
    axios
      .get(`${urls}/doctors/count`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setDoctorCount(response.data);
      })
      .catch((error) => {
        console.error('Error fetching doctor count:', error);
      });

    // Fetch Scheduled Appointments Count
    axios
      .get(`${urls}/api/appointments/scheduled/count`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setScheduledCount(response.data);
      })
      .catch((error) => {
        console.error('Error fetching scheduled appointment count:', error);
      });

    // Fetch Pending Appointments Count
    axios
      .get(`${urls}/api/appointments/pending/count`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setPendingCount(response.data);
      })
      .catch((error) => {
        console.error('Error fetching pending appointment count:', error);
      });

    // Fetch Completed Appointments Count
    axios
      .get(`${urls}/api/appointments/completed/count`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setCompletedCount(response.data);
      })
      .catch((error) => {
        console.error('Error fetching completed appointment count:', error);
      });

    // Fetch Cancelled Appointments Count
    axios
      .get(`${urls}/api/appointments/cancelled/count`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setCancelledCount(response.data);
      })
      .catch((error) => {
        console.error('Error fetching cancelled appointment count:', error);
      });

    // Fetch Completed Payments Count
    axios
      .get(`${urls}/payments/completed/count`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setPaymentCompletedCount(response.data);
      })
      .catch((error) => {
        console.error('Error fetching completed payment count:', error);
      });

    // Fetch Pending Payments Count
    axios
      .get(`${urls}/payments/pending/count`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setPaymentPendingCount(response.data);
      })
      .catch((error) => {
        console.error('Error fetching pending payment count:', error);
      });
  }, []);

  return (
    <div className="d-flex vh-100" style={{background: 'linear-gradient(135deg, #e0f7fa, #f1f8e9)'}}>
      {/* Sidebar */}
      <Sidebar className="bg-dark text-white p-3" style={{ width: '250px' }} />

      {/* Main Content */}
      <div className="d-flex flex-column flex-grow-1">
        <Navbar className="bg-primary text-white p-2" />

        <div className="container mt-4">
          <h1
            className="mb-4"
            style={{
              fontFamily: 'Montserrat, serif',
              fontOpticalSizing: 'auto',
              fontWeight: '600',
              fontStyle: 'normal',
              fontSize: '3rem',
            }}
          >
            Welcome to Admin Panel
          </h1>

          {/* Row for Patient and Doctor Cards */}
          <div className="row" style={{ marginTop: '5%', marginLeft: '20%' }}>
            {/* Total Patients Card */}
            <div className="col-md-4 mb-4">
              <Card
                sx={{
                  minWidth: 275,
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                  color: 'white',
                  boxShadow: 3,
                }}
              >
                <CardContent>
                  <Typography
                    variant="h5"
                    component="div"
                    style={{
                      fontFamily: 'Montserrat, serif',
                      fontOpticalSizing: 'auto',
                      fontWeight: '600',
                      fontStyle: 'normal',
                    }}
                    gutterBottom
                  >
                    Total Patients
                  </Typography>
                  <Box
                    sx={{
                      fontSize: '2rem',
                      mt: 2,
                      textAlign: 'center',
                      fontFamily: 'Montserrat, serif',
                      fontOpticalSizing: 'auto',
                      fontWeight: '600',
                      fontStyle: 'normal',
                    }}
                  >
                    {patientCount}
                  </Box>
                </CardContent>
              </Card>
            </div>

            {/* Total Doctors Card */}
            <div className="col-md-4 mb-4">
              <Card
                sx={{
                  minWidth: 275,
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                  color: 'white',
                  boxShadow: 3,
                }}
              >
                <CardContent>
                  <Typography
                    variant="h5"
                    component="div"
                    style={{
                      fontFamily: 'Montserrat, serif',
                      fontOpticalSizing: 'auto',
                      fontWeight: '600',
                      fontStyle: 'normal',
                    }}
                    gutterBottom
                  >
                    Total Doctors
                  </Typography>
                  <Box
                    sx={{
                      fontSize: '2rem',
                      mt: 2,
                      textAlign: 'center',
                      fontFamily: 'Montserrat, serif',
                      fontOpticalSizing: 'auto',
                      fontWeight: '600',
                      fontStyle: 'normal',
                    }}
                  >
                    {doctorCount}
                  </Box>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Row for Appointment Cards */}
          <div className="row">
            {/* Scheduled Appointments */}
            <div className="col-md-3 mb-4">
              <Card
                sx={{
                  minWidth: 275,
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
                  color: 'white',
                  boxShadow: 3,
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    component="div"
                    style={{
                      fontFamily: 'Montserrat, serif',
                      fontOpticalSizing: 'auto',
                      fontWeight: '600',
                      fontStyle: 'normal',
                    }}
                    gutterBottom
                  >
                    Scheduled Appointments
                  </Typography>
                  <Box
                    sx={{
                      fontSize: '2rem',
                      mt: 2,
                      textAlign: 'center',
                      fontFamily: 'Montserrat, serif',
                      fontOpticalSizing: 'auto',
                      fontWeight: '600',
                      fontStyle: 'normal',
                    }}
                  >
                    {scheduledCount}
                  </Box>
                </CardContent>
              </Card>
            </div>

            {/* Pending Appointments */}
            <div className="col-md-3 mb-4">
              <Card
                sx={{
                  minWidth: 275,
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #f39c12 0%, #d35400 100%)',
                  color: 'white',
                  boxShadow: 3,
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    component="div"
                    style={{
                      fontFamily: 'Montserrat, serif',
                      fontOpticalSizing: 'auto',
                      fontWeight: '600',
                      fontStyle: 'normal',
                    }}
                    gutterBottom
                  >
                    Pending Appointments
                  </Typography>
                  <Box
                    sx={{
                      fontSize: '2rem',
                      mt: 2,
                      textAlign: 'center',
                      fontFamily: 'Montserrat, serif',
                      fontOpticalSizing: 'auto',
                      fontWeight: '600',
                      fontStyle: 'normal',
                    }}
                  >
                    {pendingCount}
                  </Box>
                </CardContent>
              </Card>
            </div>

            {/* Completed Appointments */}
            <div className="col-md-3 mb-4">
              <Card
                sx={{
                  minWidth: 275,
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
                  color: 'white',
                  boxShadow: 3,
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    component="div"
                    style={{
                      fontFamily: 'Montserrat, serif',
                      fontOpticalSizing: 'auto',
                      fontWeight: '600',
                      fontStyle: 'normal',
                    }}
                    gutterBottom
                  >
                    Completed Appointments
                  </Typography>
                  <Box
                    sx={{
                      fontSize: '2rem',
                      mt: 2,
                      textAlign: 'center',
                      fontFamily: 'Montserrat, serif',
                      fontOpticalSizing: 'auto',
                      fontWeight: '600',
                      fontStyle: 'normal',
                    }}
                  >
                    {completedCount}
                  </Box>
                </CardContent>
              </Card>
            </div>

            {/* Cancelled Appointments */}
            <div className="col-md-3 mb-4">
              <Card
                sx={{
                  minWidth: 275,
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
                  color: 'white',
                  boxShadow: 3,
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    component="div"
                    style={{
                      fontFamily: 'Montserrat, serif',
                      fontOpticalSizing: 'auto',
                      fontWeight: '600',
                      fontStyle: 'normal',
                    }}
                    gutterBottom
                  >
                    Cancelled Appointments
                  </Typography>
                  <Box
                    sx={{
                      fontSize: '2rem',
                      mt: 2,
                      textAlign: 'center',
                      fontFamily: 'Montserrat, serif',
                      fontOpticalSizing: 'auto',
                      fontWeight: '600',
                      fontStyle: 'normal',
                    }}
                  >
                    {cancelledCount}
                  </Box>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Row for Payment Cards (aligned like the Patients/Doctors row) */}
          <div className="row" style={{ marginLeft: '20%' }}>
            {/* Completed Payments */}
            <div className="col-md-4 mb-4">
              <Card
                sx={{
                  minWidth: 275,
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                  color: 'white',
                  boxShadow: 3,
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    component="div"
                    style={{
                      fontFamily: 'Montserrat, serif',
                      fontOpticalSizing: 'auto',
                      fontWeight: '600',
                      fontStyle: 'normal',
                    }}
                    gutterBottom
                  >
                    Completed Payments
                  </Typography>
                  <Box
                    sx={{
                      fontSize: '2rem',
                      mt: 2,
                      textAlign: 'center',
                      fontFamily: 'Montserrat, serif',
                      fontOpticalSizing: 'auto',
                      fontWeight: '600',
                      fontStyle: 'normal',
                    }}
                  >
                    {paymentCompletedCount}
                  </Box>
                </CardContent>
              </Card>
            </div>

            {/* Pending Payments */}
            <div className="col-md-4 mb-4">
              <Card
                sx={{
                  minWidth: 275,
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                  color: 'white',
                  boxShadow: 3,
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    component="div"
                    style={{
                      fontFamily: 'Montserrat, serif',
                      fontOpticalSizing: 'auto',
                      fontWeight: '600',
                      fontStyle: 'normal',
                    }}
                    gutterBottom
                  >
                    Pending Payments
                  </Typography>
                  <Box
                    sx={{
                      fontSize: '2rem',
                      mt: 2,
                      textAlign: 'center',
                      fontFamily: 'Montserrat, serif',
                      fontOpticalSizing: 'auto',
                      fontWeight: '600',
                      fontStyle: 'normal',
                    }}
                  >
                    {paymentPendingCount}
                  </Box>
                </CardContent>
              </Card>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
