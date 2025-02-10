// src/components/Payment/PaymentForm.jsx
import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../../css/PaymentForm.css'; // Import the custom CSS for styling

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const location = useLocation();

  const [amount, setAmount] = useState(location.state?.amount || '');
  const [appointmentId, setAppointmentId] = useState(location.state?.appointmentId || '');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  console.log("PaymentForm loaded with amount:", amount, "and appointmentId:", appointmentId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setMessage('');

    try {
        const payload = { amount: amount, appointmentId: appointmentId };
        console.log("Sending payment intent payload:", payload);  
      // 1. Call backend to create a PaymentIntent and get the client secret.
      const intentRes = await axios.post('http://localhost:8080/payments/create-payment-intent', {
        amount: amount, // Ensure backend converts to the smallest unit (cents) if needed
        appointmentId: appointmentId,
      });
      const { clientSecret } = intentRes.data;

      // 2. Confirm the card payment with Stripe.
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setMessage(result.error.message);
      } else if (result.paymentIntent.status === 'succeeded') {
        // 3. On successful payment, record the details in your backend.
        await axios.post('http://localhost:8080/payments/', {
          amountPaid: parseFloat(amount),
          paymentMethod: "CREDIT", // Adjust as needed.
          transactionId: result.paymentIntent.id,
          paymentStatus: "COMPLETED",
          appointmentId: appointmentId,
        });
        setMessage("Payment Successful!");
        // navigate('/book-appointment', { state: { success: true } });
      }
    } catch (error) {
      console.error("Payment error", error);
      setMessage("Payment failed. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="payment-form-container d-flex align-items-center justify-content-center">
      <div className="payment-form-card card shadow-sm p-4">
        <div className="card-header text-center border-0">
          <h2 className="mb-0">Payment</h2>
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
                readOnly
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                required
              />
            </div>
            {/* <div className="mb-3">
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
            </div> */}
            <div className="mb-3">
              <label className="form-label">Card Details</label>
              <div className="card-element-wrapper p-2 border rounded">
                <CardElement
                  options={{
                    hidePostalCode: true,
                    style: {
                      base: {
                        fontSize: '16px',
                        color: '#495057',
                        '::placeholder': { color: '#6c757d' },
                        fontFamily: 'sans-serif',
                      },
                      invalid: { color: '#dc3545' },
                    },
                  }}
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary w-100" disabled={!stripe || loading}>
              {loading ? "Processing..." : "Pay Now"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm; 