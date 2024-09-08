import logo from './logo.svg';
import './App.css';
import Photosign from './components/Photosign';
import Login from './components/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/Photosign" element={<Photosign/>}/>
    <Route path="/Login" element={<Login/>}/>
    
  
  
  
    </Routes>
     
     </BrowserRouter>
  );
}

export default App;
