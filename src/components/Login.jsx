import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [loginType, setLoginType] = useState('user'); // Default login type: user
    const [data, setData] = useState({
        Email: '',
        Password: '',
    });
    const navigate = useNavigate();

    // Handle input changes
    const inputHandler = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    // Login handler based on the selected login type
    const readValue = () => {
        let endpoint;

        // Select the appropriate API endpoint
        switch (loginType) {
            case 'user':
                endpoint = 'http://localhost:8082/usersignin';
                break;
            case 'photographer':
                endpoint = 'http://localhost:8082/photosignin';
                break;
            case 'admin':
                endpoint = 'http://localhost:8082/admin/signin';
                break;
            case 'auditorium':
                endpoint = 'http://localhost:8082/auditorium/signin';
                break;
            case 'catering':
                endpoint = 'http://localhost:8082/catering/signin';
                break;
            case 'decoration': // New case for decorator login
                endpoint = 'http://localhost:8082/decorationsignin';
                break;
            default:
                return;
        }

        // Send login request
        axios.post(endpoint, data)
            .then((response) => {
                if (response.data.status === 'success') {
                    const {
                        token, auditoriumId, aName, aimage, userId, adminId,
                        Email, UName, Phone, Pimage, PName, cateringId, CName, Cimage,
                        decoratorId, dName, dimage, uaddress, state, City // Ensure decorator details are included
                    } = response.data;

                    // Store session data based on login type
                    sessionStorage.setItem('token', token);
                    sessionStorage.setItem('Email', Email); // Store Email for all users

                    if (loginType === 'user') {
                        sessionStorage.setItem('userId', userId);
                        sessionStorage.setItem('UName', UName);
                        sessionStorage.setItem('Phone', Phone);
                        sessionStorage.setItem('uaddress', uaddress); 
                        sessionStorage.setItem('state', state); 
                        sessionStorage.setItem('City', City); 
                        navigate('/Userp'); 
                    } else if (loginType === 'photographer') {
                        sessionStorage.setItem('userId', userId);
                        sessionStorage.setItem('Pimage', Pimage);
                        sessionStorage.setItem('PName', PName);
                        navigate('/Photop'); 
                    } else if (loginType === 'admin') {
                        sessionStorage.setItem('adminId', adminId);
                        navigate('/Adminp'); 
                    } else if (loginType === 'auditorium') {
                        sessionStorage.setItem('userId', auditoriumId);
                        sessionStorage.setItem('aName', aName);
                        sessionStorage.setItem('aimage', aimage);
                        navigate('/Auditp'); 
                    } else if (loginType === 'catering') {
                        sessionStorage.setItem('userId', cateringId);
                        sessionStorage.setItem('CName', CName);
                        sessionStorage.setItem('Cimage', Cimage);
                        navigate('/Caterp'); 
                    } else if (loginType === 'decoration') { // Handle decoration login
                        sessionStorage.setItem('userId', decoratorId);
                        sessionStorage.setItem('dName', dName);
                        sessionStorage.setItem('dimage', dimage);
                        navigate('/Decp'); // Redirect to Decoration page
                    }
                } else {
                    alert(response.data.message); // Show error message
                }
            })
            .catch((error) => {
                console.error('Login error:', error);
                alert('An error occurred. Please try again.');
            });
    };

    return (
        <div>
            <center>
                <h2>Login</h2>
                <div>
                    {/* Toggle buttons for login type */}
                    <button
                        className={`btn ${loginType === 'user' ? 'btn-primary' : 'btn-light'}`}
                        onClick={() => setLoginType('user')}
                    >
                        User Login
                    </button>
                    <button
                        className={`btn ${loginType === 'photographer' ? 'btn-primary' : 'btn-light'}`}
                        onClick={() => setLoginType('photographer')}
                    >
                        Photographer Login
                    </button>
                    <button
                        className={`btn ${loginType === 'admin' ? 'btn-primary' : 'btn-light'}`}
                        onClick={() => setLoginType('admin')}
                    >
                        Admin Login
                    </button>
                    <button
                        className={`btn ${loginType === 'auditorium' ? 'btn-primary' : 'btn-light'}`}
                        onClick={() => setLoginType('auditorium')}
                    >
                        Auditorium Login
                    </button>
                    <button
                        className={`btn ${loginType === 'catering' ? 'btn-primary' : 'btn-light'}`}
                        onClick={() => setLoginType('catering')}
                    >
                        Catering Login
                    </button>
                    <button
                        className={`btn ${loginType === 'decoration' ? 'btn-primary' : 'btn-light'}`} // Add button for decoration login
                        onClick={() => setLoginType('decoration')}
                    >
                        Decoration Login
                    </button>
                </div>
            </center>

            <div className="container">
                <form>
                    <label>Email</label>
                    <input
                        type="text"
                        name="Email"
                        value={data.Email}
                        onChange={inputHandler}
                        className="form-control"
                    />
                    <label>Password</label>
                    <input
                        type="password"
                        name="Password"
                        value={data.Password}
                        onChange={inputHandler}
                        className="form-control"
                    />
                    <button type="button" className="btn btn-success" onClick={readValue}>
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
