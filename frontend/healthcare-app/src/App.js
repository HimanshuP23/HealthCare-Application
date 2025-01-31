import './App.css';
import {Routes,Route} from 'react-router-dom'
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import AdminUserPanel from './components/Admin/AdminUserPanel';
import AdminHomePanel from './components/Admin/AdminHomePanel';
import AdminDoctorPanel from './components/Admin/AdminDoctorPanel';

function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route path="/" element={<SignUp></SignUp>}></Route>
        <Route path="/signin" element={<SignIn></SignIn>}></Route>
        <Route path="/admin/users" element={<AdminUserPanel></AdminUserPanel>}></Route>
        <Route path="/admin/home" element={<AdminHomePanel></AdminHomePanel>}></Route>
        <Route path="/admin/doctors" element={<AdminDoctorPanel></AdminDoctorPanel>}></Route>

      </Routes>
    </div>
  );
}

export default App;
