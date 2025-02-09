// src/components/Payment/PaymentInfo.jsx
import React, { useState } from 'react';
import axios from 'axios';

const PaymentInfo = () => {
  const [appointmentId, setAppointmentId] = useState('');
  const [payment, setPayment] = useState(null);
  const [error, setError] = useState('');

  const handleFetchPayment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:8080/payments/appointment/${appointmentId}`);
      setPayment(response.data);
      setError('');
    } catch (err) {
      console.error("Error fetching payment", err);
      setError("Payment not found for this appointment.");
      setPayment(null);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-secondary text-white">
          <h2 className="mb-0">Fetch Payment Information</h2>
        </div>
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleFetchPayment}>
            <div className="mb-3">
              <label htmlFor="appointmentId" className="form-label">Appointment ID</label>
              <input
                id="appointmentId"
                type="text"
                className="form-control"
                value={appointmentId}
                onChange={(e) => setAppointmentId(e.target.value)}
                placeholder="Enter Appointment ID"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary mb-3">Fetch Payment</button>
          </form>
          {payment && (
            <div className="card mt-3">
              <div className="card-header">
                Payment Details
              </div>
              <div className="card-body">
                <p><strong>Payment ID:</strong> {payment.paymentId}</p>
                <p><strong>Amount:</strong> {payment.amountPaid}</p>
                <p><strong>Method:</strong> {payment.paymentMethod}</p>
                <p><strong>Status:</strong> {payment.paymentStatus}</p>
                <p><strong>Date:</strong> {new Date(payment.paymentDate).toLocaleString()}</p>
                <p><strong>Appointment ID:</strong> {payment.appointmentId}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentInfo;
