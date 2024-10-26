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
import Caterisinup from './components/Caterisinup';
import Adbook from './components/Adbook';
import Caterp from './components/Caterp';
import Cpricing from './components/Cpricing';
import Createc from './components/Createc';
import Cviewpost from './components/Cviewpost';
import Cardc from './components/Cardc';
import Bookc from './components/Bookc';
import Statusc from './components/Statusc';
import Decsignup from './components/Decsignup';
import Decp from './components/Decp';
import Pricingd from './components/Pricingd';
import Createdec from './components/Createdec';
import Viewpostd from './components/Viewpostd';
import Cardd from './components/Cardd';
import Bookd from './components/Bookd';
import Statusd from './components/Statusd';

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
    <Route path="/catering-posts" element={<Bookc/>} />
    <Route path="/Caterisinup" element={<Caterisinup/>} />
    <Route path="/Statusa" element={<Statusa/>} />
    <Route path="/Billingu" element={<Billingu/>} />
    <Route path="/Adbook" element={<Adbook/>} />
    <Route path="/Caterp" element={<Caterp/>} />
    <Route path="/Cpricing" element={<Cpricing/>} />
    <Route path="/Createc" element={<Createc/>} />
    <Route path="/Cviewpost" element={<Cviewpost/>} />
    <Route path="/Cardc" element={<Cardc/>} />
    <Route path="/Statusc" element={<Statusc/>} />
    <Route path="/Decsignup" element={<Decsignup/>} />
    <Route path="/Decp" element={<Decp/>} />
    <Route path="/pricingd" element={<Pricingd/>} />
    <Route path="/Createdec" element={<Createdec/>} />
    <Route path="/Viewpostd" element={<Viewpostd/>} /> 
    <Route path="/Cardd" element={<Cardd/>} />
    <Route path="/decoration-posts" element={<Bookd/>} />
    <Route path="/Statusd" element={<Statusd/>} />
    </Routes>
     
     </BrowserRouter>
  );
}

export default App;
