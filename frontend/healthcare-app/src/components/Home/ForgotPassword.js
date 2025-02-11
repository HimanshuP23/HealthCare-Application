import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import { motion } from "framer-motion";

const ForgotPassword = ({ showForgotPassword, setShowForgotPassword }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleForgotPassword = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/users/password/forgot-password?email=${email}`);
      setMessage(response.data.message || "Reset link sent successfully!");
    } catch (error) {
      setMessage("Error sending reset email!");
    }
  };

  return (
    <Modal show={showForgotPassword} onHide={() => setShowForgotPassword(false)} centered>
      <Modal.Body>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="p-4 rounded-4 shadow-lg bg-white"
        >
          <h3 className="text-center text-dark mb-3">Forgot Password?</h3>
          <p className="text-center text-muted">Enter your email to receive a reset link</p>
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary w-100"
            onClick={handleForgotPassword}
          >
            Send Reset Link
          </motion.button>
          {message && <p className="text-center mt-3 text-success">{message}</p>}
          <Button variant="link" className="w-100 mt-2" onClick={() => setShowForgotPassword(false)}>
            Close
          </Button>
        </motion.div>
      </Modal.Body>
    </Modal>
  );
};

export default ForgotPassword;