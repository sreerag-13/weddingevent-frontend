import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import { FaUserCircle, FaLock } from 'react-icons/fa'; // Importing icons

const Login = () => {
    const [loginType, setLoginType] = useState('user');
    const [data, setData] = useState({
        Email: '',
        Password: '',
    });
    const navigate = useNavigate();

    const inputHandler = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const readValue = () => {
        let endpoint;
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
            case 'decoration':
                endpoint = 'http://localhost:8082/decorationsignin';
                break;
            default:
                return;
        }

        axios.post(endpoint, data)
            .then((response) => {
                if (response.data.status === 'success') {
                    const {
                        token, auditoriumId, aName, aimage, userId, adminId,aaddress,
                        Email, UName, Phone, Pimage, PName, Paddress, experience, Description,cateringId, CName,Caddress,Cimage, 
                        decoratorId, dName, dimage, uaddress, state, City 
                    } = response.data;

                    sessionStorage.setItem('token', token);
                    sessionStorage.setItem('Email', Email);

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
                        sessionStorage.setItem('experience',experience);
                        sessionStorage.setItem('Paddress',Paddress);
                        sessionStorage.setItem('Description',Description);
                        sessionStorage.setItem('state', state); 
                        sessionStorage.setItem('City', City);
                        sessionStorage.setItem('Phone', Phone); 
                        navigate('/Photop'); 
                    } else if (loginType === 'admin') {
                        sessionStorage.setItem('adminId', adminId);
                        navigate('/Adminp'); 
                    } else if (loginType === 'auditorium') {
                        sessionStorage.setItem('userId', auditoriumId);
                        sessionStorage.setItem('aName', aName);
                        sessionStorage.setItem('aimage', aimage);
                        sessionStorage.setItem('aaddress',aaddress);
                        sessionStorage.setItem('Description',Description);
                        sessionStorage.setItem('state', state); 
                        sessionStorage.setItem('City', City);
                        sessionStorage.setItem('Phone', Phone); 
                        sessionStorage.setItem('experience',experience);
                        navigate('/Auditp'); 
                    } else if (loginType === 'catering') {
                        sessionStorage.setItem('userId', cateringId);
                        sessionStorage.setItem('CName', CName);
                        sessionStorage.setItem('Cimage', Cimage);
                        sessionStorage.setItem('Caddress',Caddress);
                        sessionStorage.setItem('Description',Description);
                        sessionStorage.setItem('state', state); 
                        sessionStorage.setItem('City', City);
                        sessionStorage.setItem('Phone', Phone); 
                        sessionStorage.setItem('experience',experience);
                        navigate('/Caterp'); 
                    } else if (loginType === 'decoration') { 
                        sessionStorage.setItem('userId', decoratorId);
                        sessionStorage.setItem('dName', dName);
                        sessionStorage.setItem('dimage', dimage);
                        navigate('/Decp'); 
                    }
                } else if (response.data.status === 'error' && response.data.message) {
                    alert(response.data.message);
                } else {
                    alert('An error occurred. Please check your login type and try again.');
                }
            })
            .catch((error) => {
                console.error('Login error:', error);
                if (error.response) {
                    if (error.response.status === 401) {
                        const errorMessage = error.response.data.message;
                        if (errorMessage === 'Incorrect email') {
                            alert('Email is incorrect. Please try again.');
                        } else if (errorMessage === 'Incorrect password') {
                            alert('Password is incorrect. Please try again.');
                        } else {
                            alert('Incorrect login type or credentials. Please select the correct login type.');
                        }
                    } else {
                        alert('An error occurred. Please try again.');
                    }
                } else {
                    alert('An error occurred. Please try again.');
                }
            });
    };

    return (
        <div className="login-container">
            <header className="login-header">
                <h1>WedCode</h1>
                <p>Your booking companion</p>
            </header>
            <div className="container">
                <form>
                    <div className="form-group">
                        <label htmlFor="loginType">Select Login Type</label>
                        <select
                            id="loginType"
                            className="form-control"
                            value={loginType}
                            onChange={(e) => setLoginType(e.target.value)}
                        >
                            <option value="user">User</option>
                            <option value="photographer">Photographer</option>
                            <option value="admin">Admin</option>
                            <option value="auditorium">Auditorium</option>
                            <option value="catering">Catering</option>
                            <option value="decoration">Decoration</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <div className="input-icon">
                            <FaUserCircle />
                            <input
                                type="text"
                                name="Email"
                                value={data.Email}
                                onChange={inputHandler}
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <div className="input-icon">
                            <FaLock />
                            <input
                                type="password"
                                name="Password"
                                value={data.Password}
                                onChange={inputHandler}
                                className="form-control"
                            />
                        </div>
                    </div>

                    <button type="button" className="btn btn-success" onClick={readValue}>
                        Login
                    </button>
                </form>
            </div>
            <footer className="login-footer">
                <p>© 2024 WedCode. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Login;