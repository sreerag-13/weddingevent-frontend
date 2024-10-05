import logo from './logo.svg';
import './App.css';
import Photosign from './components/Photosign';
import Login from './components/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Photop from './components/Photop';
import Createp from './components/Createp';

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/Photosign" element={<Photosign/>}/>
    <Route path="/Login" element={<Login/>}/>
    <Route path="/Photop" element={<Photop/>}/>
    <Route path="/Createp" element={<Createp/>}/>
    
    </Routes>
     
     </BrowserRouter>
  );
}

export default App;
