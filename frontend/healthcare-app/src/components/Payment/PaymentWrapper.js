// src/components/Payment/PaymentWrapper.jsx
import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';

// Replace the below key with your actual publishable key
const stripePromise = loadStripe('pk_test_51QqXLHPQnnkSg4rU9FuTaa5BuY9cMv60tzdzuZ1O2Bh1K2rcif3vjFMI10wfWoXVUQISZomFtOQ1mwYsx24amfPS00DWDKAerL');

const PaymentWrapper = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
      {/* <PaymentHistory userId={userId} /> */}
      {/* <PaymentInfo /> */}
    </Elements>
  );
};

export default PaymentWrapper;
