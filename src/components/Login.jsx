import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
        const endpoint = loginType === 'user'
            ? 'http://localhost:8082/usersignin'
            : 'http://localhost:8082/photosignin';

        axios.post(endpoint, data)
            .then((response) => {
                if (response.data.status === 'success') {
                    const { token, userId, UName, Email, Phone, Pimage, PName } = response.data;

                    // Store common user details
                    sessionStorage.setItem('token', token);
                    sessionStorage.setItem('userId', userId);
                    sessionStorage.setItem('UName', UName);
                    sessionStorage.setItem('Email', Email); // Ensure Email is stored
                    sessionStorage.setItem('Phone', Phone); // Ensure Phone is stored

                    // Navigate based on login type
                    if (loginType === 'user') {
                        navigate('/Userp');
                    } else {
                        sessionStorage.setItem('Pimage', Pimage);
                        sessionStorage.setItem('PName', PName);
                        navigate('/Photop');
                    }
                } else {
                    alert(response.data.message);
                }
            })
            .catch((error) => {
                console.error(error);
                alert('An error occurred. Please try again.');
            });
    };

    return (
        <div>
            <center>
                <h2>Login</h2>
                <div>
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
