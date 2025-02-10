import { motion } from 'framer-motion';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { X } from 'lucide-react';
import axios from 'axios';
import { useState } from 'react';

const SignUp = ({ showSignup, setShowSignup }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('PATIENT'); // Default role
  const [error, setError] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [success, setSuccess] = useState(null);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post('http://localhost:8080/users/signup', {
        name,
        email,
        password,
        phoneNumber,
        role
      });

      setSuccess('Signup successful! Please log in.');
      setTimeout(() => {
        setShowSignup(false); // Close modal after success
      }, 2000);
      
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message || 'Signup failed');
      } else {
        setError('Error during registration. Try again.');
      }
    }
  };

  return (
    <Modal show={showSignup} onHide={() => setShowSignup(false)} centered>
      <Modal.Body>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="d-flex rounded-4 shadow-lg overflow-hidden position-relative"
          style={{ maxWidth: '900px', width: '100%', backgroundColor: '#ffffffdd', backdropFilter: 'blur(10px)' }}
        >
          <button 
            onClick={() => setShowSignup(false)} 
            className="btn-close position-absolute top-0 end-0 m-3"
            aria-label="Close"
          >
            <X size={24} />
          </button>
          <div className="p-5 bg-white" style={{ flex: 1 }}>
            <h2 className="text-center text-dark mb-4">Create an Account</h2>
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
            {success && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="alert alert-success text-center rounded-3"
                role="alert"
              >
                {success}
              </motion.div>
            )}
            <form onSubmit={handleSignup}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label text-dark">Full Name</label>
                <input
                  type="text"
                  id="name"
                  className="form-control rounded-pill shadow-sm"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
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
              <div className="mb-3">
                <label htmlFor="phonenumber" className="form-label text-dark">Phone Number</label>
                <input
                  type="phonenumber"
                  id="phonenumber"
                  className="form-control rounded-pill shadow-sm"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="role" className="form-label text-dark">Role</label>
                <select
                  id="role"
                  className="form-select rounded-pill shadow-sm"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="PATIENT">Patient</option>
                  <option value="DOCTOR">Doctor</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="btn w-100 rounded-pill shadow-sm"
                style={{ backgroundColor: '#0000FF', borderColor: '#6a1b9a', color: '#fff' }}
              >
                Sign Up
              </motion.button>
            </form>
            <div className="text-center mt-3">
              <p className="text-dark">Already have an account? 
                <button 
                  className="btn btn-link p-0 text-primary"
                  onClick={() => setShowSignup(false)}
                >
                  Log In
                </button>
              </p>
            </div>
          </div>
        </motion.div>
      </Modal.Body>
    </Modal>
  );
};

export default SignUp;











// //with validation code 

// import { motion } from "framer-motion";
// import Modal from "react-bootstrap/Modal";
// import Button from "react-bootstrap/Button";
// import { X } from "lucide-react";
// import axios from "axios";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";

// // ✅ Define Validation Schema Using Yup
// const validationSchema = yup.object().shape({
//   name: yup.string().required("Name is required").max(100, "Max 100 characters allowed"),
//   email: yup.string().required("Email is required").email("Invalid email format").max(100, "Max 100 characters allowed"),
//   password: yup.string().required("Password is required").min(8, "Password must be at least 8 characters long"),
//   phoneNumber: yup
//     .string()
//     .required("Phone number is required")
//     .matches(/^[0-9]{10,15}$/, "Phone number must be between 10 and 15 digits"),
//   role: yup.string().oneOf(["PATIENT", "DOCTOR", "ADMIN"], "Invalid role").required("Role is required"),
// });

// const SignUp = ({ showSignup, setShowSignup }) => {
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);

//   // ✅ Integrate React Hook Form
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(validationSchema),
//   });

//   // ✅ Form Submission with Validation
//   const onSubmit = async (data) => {
//     setError(null);
//     setSuccess(null);

//     try {
//       const response = await axios.post("http://localhost:8080/users/signup", data);
//       setSuccess("Signup successful! Please log in.");
//       setTimeout(() => {
//         setShowSignup(false);
//       }, 2000);
//     } catch (error) {
//       setError(error.response?.data?.message || "Signup failed");
//     }
//   };

//   return (
//     <Modal show={showSignup} onHide={() => setShowSignup(false)} centered>
//       <Modal.Body>
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.5 }}
//           className="d-flex rounded-4 shadow-lg overflow-hidden position-relative"
//           style={{ maxWidth: "900px", width: "100%", backgroundColor: "#ffffffdd", backdropFilter: "blur(10px)" }}
//         >
//           <button onClick={() => setShowSignup(false)} className="btn-close position-absolute top-0 end-0 m-3">
//             <X size={24} />
//           </button>
//           <div className="p-5 bg-white" style={{ flex: 1 }}>
//             <h2 className="text-center text-dark mb-4">Create an Account</h2>
//             {error && <div className="alert alert-danger text-center">{error}</div>}
//             {success && <div className="alert alert-success text-center">{success}</div>}

//             <form onSubmit={handleSubmit(onSubmit)}>
//               <div className="mb-3">
//                 <label className="form-label">Full Name</label>
//                 <input {...register("name")} className="form-control rounded-pill shadow-sm" />
//                 <p className="text-danger">{errors.name?.message}</p>
//               </div>

//               <div className="mb-3">
//                 <label className="form-label">Email Address</label>
//                 <input type="email" {...register("email")} className="form-control rounded-pill shadow-sm" />
//                 <p className="text-danger">{errors.email?.message}</p>
//               </div>

//               <div className="mb-3">
//                 <label className="form-label">Password</label>
//                 <input type="password" {...register("password")} className="form-control rounded-pill shadow-sm" />
//                 <p className="text-danger">{errors.password?.message}</p>
//               </div>

//               <div className="mb-3">
//                 <label className="form-label">Phone Number</label>
//                 <input {...register("phoneNumber")} className="form-control rounded-pill shadow-sm" />
//                 <p className="text-danger">{errors.phoneNumber?.message}</p>
//               </div>

//               <div className="mb-3">
//                 <label className="form-label">Role</label>
//                 <select {...register("role")} className="form-select rounded-pill shadow-sm">
//                   <option value="PATIENT">Patient</option>
//                   <option value="DOCTOR">Doctor</option>
//                   <option value="ADMIN">Admin</option>
//                 </select>
//                 <p className="text-danger">{errors.role?.message}</p>
//               </div>

//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 type="submit"
//                 className="btn w-100 rounded-pill shadow-sm"
//                 style={{ backgroundColor: "#0000FF", borderColor: "#6a1b9a", color: "#fff" }}
//               >
//                 Sign Up
//               </motion.button>
//             </form>
//           </div>
//         </motion.div>
//       </Modal.Body>
//     </Modal>
//   );
// };

// export default SignUp;
