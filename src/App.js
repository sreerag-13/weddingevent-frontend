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
import Adminp from './components/Adminp';
import Audisignup from './components/Audisignup';
import Auditp from './components/Auditp';
import Createa from './components/Createa';
import Aviewp from './components/Aviewp';
import Statusp from './components/Statusp';
import Statusu from './components/Statusu';
import Apricing from './components/Apricing';
import Carda from './components/Carda';
import Booka from './components/Booka';
import Statusa from './components/Statusa';
import Billingu from './components/Billingu';

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
    <Route path="/Carda" element={<Carda/>}/>
    <Route path="/user-posts" element={<Bookp/>} />
    <Route path="/Adminp" element={<Adminp/>} />
    <Route path="/Audisignup" element={<Audisignup/>} />
    <Route path="/Auditp" element={<Auditp/>} />
    <Route path="/Createa" element={<Createa/>} />
    <Route path="/Aviewp" element={<Aviewp/>} />
    <Route path="/Statusp" element={<Statusp/>} />
    <Route path="/Statusu" element={<Statusu/>} />
    <Route path="/Apricing" element={<Apricing/>} />
    <Route path="/auditorium-posts" element={<Booka/>} />
   
    <Route path="/Statusa" element={<Statusa/>} />
    <Route path="/Billingu" element={<Billingu/>} />
    </Routes>
     
     </BrowserRouter>
  );
}

export default App;
