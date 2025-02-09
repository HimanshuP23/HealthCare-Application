// src/components/Payment/PaymentForm.jsx
import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [amount, setAmount] = useState('');
  const [appointmentId, setAppointmentId] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setMessage('');

    try {
      // 1. Call your backend to create a PaymentIntent and retrieve the client secret.
      const intentRes = await axios.post('http://localhost:8080/payments/create-payment-intent', {
        amount: amount, // Backend should convert to the smallest currency unit if necessary
        appointmentId: appointmentId,
      });
      const { clientSecret } = intentRes.data;

      // 2. Confirm the card payment using Stripe.
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setMessage(result.error.message);
      } else if (result.paymentIntent.status === 'succeeded') {
        // 3. On successful payment, record the payment details in your backend.
        await axios.post('http://localhost:8080/payments/', {
          amountPaid: parseFloat(amount),
          paymentMethod: "CREDIT", // You can change or extend this as needed.
          transactionId: result.paymentIntent.id,
          paymentStatus: "COMPLETED",
          appointmentId: appointmentId
        });
        setMessage("Payment Successful!");
      }
    } catch (error) {
      console.error("Payment error", error);
      setMessage("Payment failed. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h2 className="mb-0">Make a Payment</h2>
        </div>
        <div className="card-body">
          {message && <div className="alert alert-info">{message}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="amount" className="form-label">Amount</label>
              <input
                id="amount"
                type="number"
                className="form-control"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                required
              />
            </div>
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
            <div className="mb-3">
              <label className="form-label">Card Details</label>
              <div className="p-2 border rounded">
                <CardElement options={{ hidePostalCode: true }} />
              </div>
            </div>
            <button type="submit" className="btn btn-success w-100" disabled={!stripe || loading}>
              {loading ? "Processing..." : "Pay"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
