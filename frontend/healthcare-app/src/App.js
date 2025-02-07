import './App.css';
import {Routes,Route} from 'react-router-dom'
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import AdminUserPanel from './components/Admin/AdminUserPanel';
import AdminHomePanel from './components/Admin/AdminHomePanel';
import AdminDoctorPanel from './components/Admin/AdminDoctorPanel';


import Home from './pages/Home';
import BookAppointment from './pages/BookAppointment';
import DoctorAppointments from './pages/DoctorAppointments';
import PatientAppointments from './pages/PatientAppointments';


import { createTheme, ThemeProvider } from '@mui/material/styles';

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
        <Route path="/" element={<SignUp></SignUp>}></Route>
        <Route path="/signin" element={<SignIn></SignIn>}></Route>
        <Route path="/admin/users" element={<AdminUserPanel></AdminUserPanel>}></Route>
        <Route path="/admin/home" element={<AdminHomePanel></AdminHomePanel>}></Route>
        <Route path="/admin/doctors" element={<AdminDoctorPanel></AdminDoctorPanel>}></Route>


        {/* New Appointment Routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/book-appointment" element={<BookAppointment />} />
        <Route path="/doctor-appointments" element={<DoctorAppointments />} />
        <Route path="/patient-appointments" element={<PatientAppointments />} />
      </Routes>
    </div>
  );
}

export default App;
