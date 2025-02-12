// src/components/PaymentInvoice/PaymentInvoice.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PaymentInvoice = () => {
  const { paymentId } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const urls = process.env.REACT_APP_API_URL;


  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await axios.get(`${urls}/invoices/download/${paymentId}`, {
          responseType: 'blob',
        });
        const url = URL.createObjectURL(response.data);
        setInvoice(url);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchInvoice();
  }, [paymentId]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = invoice;
    link.download = `invoice_${paymentId}.pdf`;
    link.click();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Payment Invoice</h2>
      <embed src={invoice} type="application/pdf" width="100%" height="500px" />
      <button onClick={handleDownload}>Download Invoice</button>
    </div>
  );
};

export default PaymentInvoice;