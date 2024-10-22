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
            case 'catering': // Add catering case
                endpoint = 'http://localhost:8082/catering/signin';
                break;
            default:
                return;
        }

        // Send login request
        axios.post(endpoint, data)
            .then((response) => {
                if (response.data.status === 'success') {
                    const { token, auditoriumId, aName, aimage, userId, adminId, Email, UName, Phone, Pimage, PName, cateringId, CName, Cimage } = response.data;

                    // Store session data based on login type
                    sessionStorage.setItem('token', token);
                    sessionStorage.setItem('Email', Email); // Store Email for all users

                    if (loginType === 'user') {
                        sessionStorage.setItem('userId', userId);
                        sessionStorage.setItem('UName', UName);
                        sessionStorage.setItem('Phone', Phone);
                        navigate('/Userp'); // Redirect to User page
                    } else if (loginType === 'photographer') {
                        sessionStorage.setItem('userId', userId);
                        sessionStorage.setItem('Pimage', Pimage);
                        sessionStorage.setItem('PName', PName);
                        navigate('/Photop'); // Redirect to Photographer page
                    } else if (loginType === 'admin') {
                        sessionStorage.setItem('adminId', adminId);
                        navigate('/Adminp'); // Redirect to Admin Dashboard
                    } else if (loginType === 'auditorium') {
                        sessionStorage.setItem('userId', auditoriumId);
                        sessionStorage.setItem('aName', aName);
                        sessionStorage.setItem('aimage', aimage);
                        navigate('/Auditp'); // Redirect to Auditorium page
                    } else if (loginType === 'catering') { // Handle catering login
                        sessionStorage.setItem('userId', cateringId);
                        sessionStorage.setItem('CName', CName);
                        sessionStorage.setItem('Cimage', Cimage);
                        navigate('/Caterp'); // Redirect to Catering page
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
                        onClick={() => setLoginType('catering')} // Add this button for catering login
                    >
                        Catering Login
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
