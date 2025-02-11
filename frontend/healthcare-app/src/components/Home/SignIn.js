// import { motion } from 'framer-motion';
// import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';
// import { X } from 'lucide-react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { useState } from 'react';
// import SignupModal from './SignUp'; // Import the Signup modal component

// const SignIn = ({ showLogin, setShowLogin }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState(null);
//   const [showSignup, setShowSignup] = useState(false); // State for signup modal
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError(null);

//     try {
//       const response = await axios.post('http://localhost:8080/users/signin', {
//         email,
//         password,
//       });

//       const { jwt, role, userId, user } = response.data;
//       if (role === "DOCTOR" && response.data.doctorDetails) {
//         localStorage.setItem('doctorid', response.data.doctorDetails.doctorId);
//       }

//       localStorage.setItem('token', jwt);
//       localStorage.setItem('user', userId);
//       localStorage.setItem('role', role);
//       localStorage.setItem('userobj', JSON.stringify(user));

//       setShowLogin(false); // Close login modal
//       setTimeout(() => {
//         window.location.reload();
//       }, 500);
      
//     } catch (error) {
//       if (error.response && error.response.data) {
//         setError(error.response.data.message || 'Authentication failed');
//       } else {
//         setError('Invalid Username or Password');
//       }
//     }
//   };

//   return (
//     <>
//       <Modal show={showLogin} onHide={() => setShowLogin(false)} centered>
//         <Modal.Body>
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.5 }}
//             className="d-flex rounded-4 shadow-lg overflow-hidden position-relative"
//             style={{
//               maxWidth: "900px",
//               width: "100%",
//               backgroundColor: "#ffffffdd",
//               backdropFilter: "blur(10px)",
//             }}
//           >
//             <button
//               onClick={() => setShowLogin(false)}
//               className="btn-close position-absolute"
//               aria-label="Close"
//               style={{
//                 top: "1.5rem",
//                 right: "1.5rem",
//                 zIndex: 1,
//                 padding: "0.5rem",
//               }}
//             >
//               <X size={2} strokeWidth={2.5} />
//             </button>
//             <div className="p-5 bg-white" style={{ flex: 1 }}>
//               <h2 className="text-center text-dark mb-4">Welcome Back!</h2>
//               {error && (
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   className="alert alert-danger text-center rounded-3"
//                   role="alert"
//                 >
//                   {error}
//                 </motion.div>
//               )}
//               <form onSubmit={handleLogin}>
//                 <div className="mb-3">
//                   <label htmlFor="email" className="form-label text-dark">
//                     Email Address
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     className="form-control rounded-pill shadow-sm"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="password" className="form-label text-dark">
//                     Password
//                   </label>
//                   <input
//                     type="password"
//                     id="password"
//                     className="form-control rounded-pill shadow-sm"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                   />
//                 </div>
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   type="submit"
//                   className="btn w-100 rounded-pill shadow-sm"
//                   style={{
//                     backgroundColor: "#0000FF",
//                     borderColor: "#6a1b9a",
//                     color: "#fff",
//                   }}
//                 >
//                   Login
//                 </motion.button>
//               </form>
//               <div className="text-center mt-3">
//                 <p className="text-dark">
//                   New User?
//                   <button
//                     className="btn btn-link p-0 text-primary"
//                     onClick={() => {
//                       setShowLogin(false);
//                       setShowSignup(true);
//                     }}
//                   >
//                     Sign Up
//                   </button>
//                 </p>
//               </div>
//             </div>
//           </motion.div>
//         </Modal.Body>
//       </Modal>

//       {/* Signup Modal */}
//       <SignupModal showSignup={showSignup} setShowSignup={setShowSignup} />
//     </>
//   );
// };

// export default SignIn;

import { motion } from 'framer-motion';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { X } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import SignupModal from './SignUp'; // Import the Signup modal component
import ForgotPasswordModal from './ForgotPassword'; // Import the Forgot Password modal component

const SignIn = ({ showLogin, setShowLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [showSignup, setShowSignup] = useState(false); // State for signup modal
  const [showForgotPassword, setShowForgotPassword] = useState(false); // State for forgot password modal
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post('http://localhost:8080/users/signin', {
        email,
        password,
      });

      const { jwt, role, userId, user, doctorDetails } = response.data;
      if (role === "DOCTOR" && response.data.doctorDetails) {
        localStorage.setItem('doctorid', response.data.doctorDetails.doctorId);
      }
      
      localStorage.setItem('doctordetails', doctorDetails )
      localStorage.setItem('userdata', JSON.stringify(user));
      localStorage.setItem('token', jwt);
      localStorage.setItem('user', userId);
      localStorage.setItem('role', role);

      setShowLogin(false); // Close login modal
      setTimeout(() => {
        window.location.reload();
      }, 500);
      
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message || 'Authentication failed');
      } else {
        setError('Invalid Username or Password');
      }
    }
  };


  return (
    <>
      <Modal show={showLogin} onHide={() => setShowLogin(false)} centered>
        <Modal.Body>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="d-flex rounded-4 shadow-lg overflow-hidden position-relative"
            style={{ maxWidth: '900px', width: '100%', backgroundColor: '#ffffffdd', backdropFilter: 'blur(10px)' }}
          >
            <button
              onClick={() => setShowLogin(false)}
              className="btn-close position-absolute"
              aria-label="Close"
              style={{
                top: "1.5rem",
                right: "1.5rem",
                zIndex: 1,
                padding: "0.5rem",
              }}
            >
              <X size={2} strokeWidth={2.5} />
            </button>
            <div className="p-5 bg-white" style={{ flex: 1 }}>
              <h2 className="text-center text-dark mb-4">Welcome Back!</h2>
              {error && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="alert alert-danger text-center rounded-3"
                  role="alert"
                >
                  {error}
                </motion.div>
              )}
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label text-dark">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    className="form-control rounded-pill shadow-sm"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label text-dark">Password</label>
                  <input
                    type="password"
                    id="password"
                    className="form-control rounded-pill shadow-sm"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                  Login
                </motion.button>
              </form>
              <div className="text-center mt-3">
                <p className="text-dark">
                  New User?{' '}
                  <button 
                    className="btn btn-link p-0 text-primary"
                    onClick={() => {
                      setShowLogin(false);
                      setShowSignup(true);
                    }}
                  >
                    Sign Up
                  </button>
                </p>
                {/* Added Forgot Password Button */}
                <p>
                  <button 
                    className="btn btn-link p-0 text-primary"
                    onClick={() => {
                      setShowLogin(false);
                      setShowForgotPassword(true);
                    }}
                  >
                    Forgot Password?
                  </button>
                </p>
              </div>
            </div>
          </motion.div>
        </Modal.Body>
      </Modal>

      {/* Signup Modal */}
      <SignupModal showSignup={showSignup} setShowSignup={setShowSignup} />
    {/* Forgot Password Modal */}
<ForgotPasswordModal showForgotPassword={showForgotPassword} setShowForgotPassword={setShowForgotPassword} />
    </>
  );
};

export default SignIn;





// // with forget password 

// import { motion } from 'framer-motion';
// import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';
// import { X } from 'lucide-react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { useState } from 'react';
// import SignupModal from './SignUp'; // Import the Signup modal component
// import ForgotPasswordModal from './ForgotPassword'; // Import the Forgot Password modal component

// const SignIn = ({ showLogin, setShowLogin }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState(null);
//   const [showSignup, setShowSignup] = useState(false); // State for signup modal
//   const [showForgotPassword, setShowForgotPassword] = useState(false); // State for forgot password modal
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError(null);

//     try {
//       const response = await axios.post('http://localhost:8080/users/signin', {
//         email,
//         password,
//       });

//       const { jwt, role, userId } = response.data;
//       if (role === "DOCTOR" && response.data.doctorDetails) {
//         localStorage.setItem('doctorid', response.data.doctorDetails.doctorId);
//       }

//       localStorage.setItem('token', jwt);
//       localStorage.setItem('user', userId);
//       localStorage.setItem('role', role);

//       setShowLogin(false); // Close login modal
//       setTimeout(() => {
//         window.location.reload();
//       }, 500);
      
//     } catch (error) {
//       if (error.response && error.response.data) {
//         setError(error.response.data.message || 'Authentication failed');
//       } else {
//         setError('Invalid Username or Password');
//       }
//     }
//   };

//   return (
//     <>
//       <Modal show={showLogin} onHide={() => setShowLogin(false)} centered>
//         <Modal.Body>
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.5 }}
//             className="d-flex rounded-4 shadow-lg overflow-hidden position-relative"
//             style={{ maxWidth: '900px', width: '100%', backgroundColor: '#ffffffdd', backdropFilter: 'blur(10px)' }}
//           >
//             <button 
//               onClick={() => setShowLogin(false)} 
//               className="btn-close position-absolute top-0 end-0 m-3"
//               aria-label="Close"
//             >
//               <X size={24} />
//             </button>
//             <div className="p-5 bg-white" style={{ flex: 1 }}>
//               <h2 className="text-center text-dark mb-4">Welcome Back!</h2>
//               {error && (
//                 <motion.div 
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   className="alert alert-danger text-center rounded-3"
//                   role="alert"
//                 >
//                   {error}
//                 </motion.div>
//               )}
//               <form onSubmit={handleLogin}>
//                 <div className="mb-3">
//                   <label htmlFor="email" className="form-label text-dark">Email Address</label>
//                   <input
//                     type="email"
//                     id="email"
//                     className="form-control rounded-pill shadow-sm"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="password" className="form-label text-dark">Password</label>
//                   <input
//                     type="password"
//                     id="password"
//                     className="form-control rounded-pill shadow-sm"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                   />
//                 </div>
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   type="submit"
//                   className="btn w-100 rounded-pill shadow-sm"
//                   style={{ backgroundColor: '#0000FF', borderColor: '#6a1b9a', color: '#fff' }}
//                 >
//                   Login
//                 </motion.button>
//               </form>
//               <div className="text-center mt-3">
//                 <p className="text-dark">New User? 
//                   <button 
//                     className="btn btn-link p-0 text-primary"
//                     onClick={() => {
//                       setShowLogin(false);
//                       setShowSignup(true);
//                     }}
//                   >
//                     Sign Up
//                   </button>
//                 </p>
//                 <p>
//                   <button 
//                     className="btn btn-link p-0 text-primary"
//                     onClick={() => {
//                       setShowLogin(false);
//                       setShowForgotPassword(true);
//                     }}
//                   >
//                     Forgot Password?
//                   </button>
//                 </p>
//               </div>
//             </div>
//           </motion.div>
//         </Modal.Body>
//       </Modal>

//       {/* Signup Modal */}
//       <SignupModal showSignup={showSignup} setShowSignup={setShowSignup} />
      
//       {/* Forgot Password Modal */}
//       <ForgotPasswordModal showForgotPassword={showForgotPassword} setShowForgotPassword={setShowForgotPassword} />
//     </>
//   );
// };

// export default SignIn;