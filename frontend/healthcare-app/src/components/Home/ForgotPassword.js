import { useState } from 'react';
import { motion } from 'framer-motion';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { X } from 'lucide-react';

const ForgotPassword = ({ showForgotPassword, setShowForgotPassword }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    
    try {
      const response = await axios.post('http://localhost:8080/users/forgot-password', { email });
      setMessage(response.data.message || 'Password reset link sent to your email.');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to send reset link.');
    }
  };

  return (
    <Modal show={showForgotPassword} onHide={() => setShowForgotPassword(false)} centered>
      <Modal.Body>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="d-flex rounded-4 shadow-lg overflow-hidden position-relative"
          style={{ maxWidth: '600px', width: '100%', backgroundColor: '#ffffffdd', backdropFilter: 'blur(10px)' }}
        >
          <button 
            onClick={() => setShowForgotPassword(false)} 
            className="btn-close position-absolute top-0 end-0 m-3"
            aria-label="Close"
          >
            <X size={24} />
          </button>
          <div className="p-5 bg-white" style={{ flex: 1 }}>
            <h2 className="text-center text-dark mb-4">Reset Password</h2>
            {message && <div className="alert alert-success text-center">{message}</div>}
            {error && <div className="alert alert-danger text-center">{error}</div>}
            <form onSubmit={handleForgotPassword}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label text-dark">Enter your Email</label>
                <input
                  type="email"
                  id="email"
                  className="form-control rounded-pill shadow-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="btn w-100 rounded-pill shadow-sm"
                style={{ backgroundColor: '#0000FF', borderColor: '#6a1b9a', color: '#fff' }}
              >
                Send Reset Link
              </motion.button>
            </form>
          </div>
        </motion.div>
      </Modal.Body>
    </Modal>
  );
};

export default ForgotPassword;
