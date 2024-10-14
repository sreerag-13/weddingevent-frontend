import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [loginType, setLoginType] = useState('user'); // State to toggle login type
  const [data, setData] = useState({
    Email: '',
    Password: '',
  });
  const navigate = useNavigate();

  const inputHandler = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const readValue = () => {
    const endpoint =
      loginType === 'user'
        ? 'http://localhost:8082/usersignin'
        : 'http://localhost:8082/photosignin';

    axios
      .post(endpoint, data)
      .then((response) => {
        if (response.data.status === 'success') {
          const { token, userId, UName, Pimage, PName, Phone } = response.data;

          // Store common user details
          sessionStorage.setItem('token', token);
          sessionStorage.setItem('userId', userId);

          // Store additional details based on login type
          if (loginType === 'user') {
            sessionStorage.setItem('UName', UName);
            navigate('/Userp'); // Navigate to UserP page
          } else {
            sessionStorage.setItem('Pimage', Pimage);
            sessionStorage.setItem('PName', PName);
            sessionStorage.setItem('Phone', Phone);
            navigate('/Photop'); // Navigate to Photographer page
          }
        } else if (response.data.status === 'error') {
          alert(response.data.message); // Display error message
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
          {/* Toggle between User and Photographer Sign-in */}
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
