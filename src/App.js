import logo from './logo.svg';
import './App.css';
import Photosign from './components/Photosign';
import Login from './components/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Photop from './components/Photop';
import Createp from './components/Createp';
import Viewpostp from './components/Viewpostp';
import Ppricing from './components/Ppricing';
import Usersignup from './components/Usersignup';
import Userp from './components/Userp';
import Cardsp from './components/Cardsp';
import Bookp from './components/Bookp';

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/Photosign" element={<Photosign/>}/>
    <Route path="/Login" element={<Login/>}/>
    <Route path="/Photop" element={<Photop/>}/>
    <Route path="/Createp" element={<Createp/>}/>
    <Route path="/Viewpostp" element={<Viewpostp/>}/>
    <Route path="/Ppricing" element={<Ppricing/>}/>
    <Route path="/Usersignup" element={<Usersignup/>}/>
    <Route path="/Userp" element={<Userp/>}/>
    <Route path="/Cardsp" element={<Cardsp/>}/>
    <Route path="/user-posts" element={<Bookp/>} />

    </Routes>
     
     </BrowserRouter>
  );
}

export default App;
