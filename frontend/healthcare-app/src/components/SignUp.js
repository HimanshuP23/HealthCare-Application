import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/users/signup', {
        name,
        email,
        password,
        phoneNumber,
        role
      });
      console.log(response);
      // Redirect to login page or display success message
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4 w-50" style={{ borderRadius: '15px', background: '#f9f9f9' }}>
        <h2 className="text-center mb-4" style={{ color: '#333', fontWeight: 'bold' }}>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label" style={{ fontWeight: '500' }}>Name</label>
            <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label" style={{ fontWeight: '500' }}>Email</label>
            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label" style={{ fontWeight: '500' }}>Password</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label" style={{ fontWeight: '500' }}>Phone Number</label>
            <input type="text" className="form-control" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label" style={{ fontWeight: '500' }}>Role</label>
            <select className="form-select" value={role} onChange={(e) => setRole(e.target.value)} required>
              <option value="">Select Role</option>
              <option value="DOCTOR">Doctor</option>
              <option value="PATIENT">Patient</option>
            </select>
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <button type="submit" className="btn btn-primary w-100" style={{ background: '#007bff', border: 'none', fontWeight: 'bold' }}>Register</button>
        </form>
        <p className="text-center mt-3" style={{ color: '#555', fontSize: '0.9rem' }}>
          Already registered? <a href="/signin" style={{ color: '#007bff', textDecoration: 'none' }}>Login</a>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
