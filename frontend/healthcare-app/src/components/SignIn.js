import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:8080/users/signin', {
        email,
        password,
      });

      console.log(response.data);
      const { jwt, role } = response.data; // Assuming the API response includes the user's role
      localStorage.setItem('token', jwt);

    // Navigate based on the role
      if (role === 'ADMIN') {
        navigate('/admin/home'); // Redirect to the admin panel for admin users
      } else if (role === 'DOCTOR' || role === 'PATIENT') {
        navigate('/home'); // Modify or create a dashboard route as required
      } else {
        setError('Unknown user role');
    }
  } catch (error) {
    if (error.response && error.response.data) {
      setError(error.response.data.message || 'Authentication failed');
    } else {
      setError('Invalid Username or Password');
    }
  }
  };

  return (
    <div className="vh-100 d-flex flex-column justify-content-center bg-light">
      <h1 style={{fontSize:'40px',fontFamily: 'cursive'}} className="text-center text-info mb-4 text-decoration-underline">CareBuddy - HealthCare Application</h1>
      
      <div className="d-flex justify-content-center mt-4">
        <div className="card shadow-lg p-4" style={{ maxWidth: '400px', width: '100%' }}>
          <h2 className="text-center text-primary mb-4">Login</h2>
          {error && (
            <div className="alert alert-danger text-center" role="alert">
              {error}
            </div>
          )}
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>
          <p className="mt-3 text-center">
            Don&apos;t have an account?{' '}
            <a href="/" className="text-primary text-decoration-none">
              Sign up here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
