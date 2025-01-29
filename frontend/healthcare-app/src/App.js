import './App.css';
import {Routes,Route} from 'react-router-dom'
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route path="/" element={<SignUp></SignUp>}></Route>
        <Route path="/signin" element={<SignIn></SignIn>}></Route>
      </Routes>
    </div>
  );
}

export default App;
