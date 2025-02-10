import './App.css';
import {Routes,Route} from 'react-router-dom'
import SignIn from './components/Home/SignIn';
import SignUp from './components/Home/SignUp';
import AdminUserPanel from './components/Admin/AdminUserPanel';
import AdminHomePanel from './components/Admin/AdminHomePanel';
import AdminDoctorPanel from './components/Admin/AdminDoctorPanel';

import Home from './pages/Home';
import BookAppointment from './pages/BookAppointment';
import DoctorAppointments from './pages/DoctorAppointments';
import PatientAppointments from './pages/PatientAppointments';
import HomePage from './components/Home/HomePage';
import FindDoctors from './components/Home/FindDoctors';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import PaymentWrapper from './components/Payment/PaymentWrapper';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
    },
});

const App = () => {
  return (
    <div className="App">
      
      <Routes>
        {/* Signin/Signup */}
        <Route path="/signup" element={<SignUp></SignUp>}></Route>
        <Route path="/signin" element={<SignIn></SignIn>}></Route>

        {/* Admin Panel */}
        <Route path="/admin/users" element={<AdminUserPanel></AdminUserPanel>}></Route>
        <Route path="/admin/home" element={<AdminHomePanel></AdminHomePanel>}></Route>
        <Route path="/admin/doctors" element={<AdminDoctorPanel></AdminDoctorPanel>}></Route>

        {/* New Appointment Routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/book-appointment" element={<BookAppointment />} />
        <Route path="/doctor/dashboard" element={<DoctorAppointments />} />
        <Route path="/patient-appointments" element={<PatientAppointments />} />

        {/* Home Page */}
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/find-doctors" element={<FindDoctors></FindDoctors>}></Route>
        
        <Route path='/payment' element={<PaymentWrapper></PaymentWrapper>}></Route>

        
      </Routes>
    </div>
  );
}

export default App;
