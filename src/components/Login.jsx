import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [data, setData] = useState({
    Email: '',
    Password: '',
  });
  const navigate = useNavigate();

  const inputHandler = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const readValue = () => {
    axios
      .post('http://localhost:8082/photosignin', data)
      .then((response) => {
        if (response.data.status === 'success') {
          const { token, Pimage, PName, Phone, userId } = response.data;  
          sessionStorage.setItem('token', token);
          sessionStorage.setItem('Pimage', Pimage); 
          sessionStorage.setItem('PName', PName);   
          sessionStorage.setItem('Phone', Phone);   
          sessionStorage.setItem('userId', userId); 
          navigate('/Photop');
        } else if (response.data.status === 'incorrect password') {
          alert('Incorrect password');
        } else if (response.data.status === 'incorrect email') {
          alert('Incorrect email');
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
          <button
            type="button"
            className="btn btn-success"
            onClick={readValue}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;