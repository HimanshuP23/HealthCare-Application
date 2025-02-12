// src/components/Payment/PaymentHistory.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PaymentHistory = ({ userId }) => {
  const [payments, setPayments] = useState([]);
  const urls = process.env.REACT_APP_API_URL;


  useEffect(() => {
    axios.get(`${urls}/payments/user/${userId}`)
      .then(response => setPayments(response.data))
      .catch(error => console.error("Error fetching payment history", error));
  }, [userId]);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Payment History</h2>
      {payments.length === 0 ? (
        <div className="alert alert-warning">No payments found.</div>
      ) : (
        <div className="card shadow">
          <div className="card-body">
            <table className="table table-striped">
              <thead className="table-dark">
                <tr>
                  <th>Payment ID</th>
                  <th>Amount</th>
                  <th>Method</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Appointment ID</th>
                </tr>
              </thead>
              <tbody>
                {payments.map(payment => (
                  <tr key={payment.paymentId}>
                    <td>{payment.paymentId}</td>
                    <td>{payment.amountPaid}</td>
                    <td>{payment.paymentMethod}</td>
                    <td>{payment.paymentStatus}</td>
                    <td>{new Date(payment.paymentDate).toLocaleString()}</td>
                    <td>{payment.appointmentId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
