import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    console.log(data);
    axios
      .post('http://localhost:8082/photosignin', data)
      .then((response) => {
        console.log(response.data);
        if (response.data.status === 'incorrect password') {
          alert('Incorrect password');
        } else if (response.data.status === 'incorrect email') {
          alert('Incorrect email');
        } else {
          let token = response.data.token;
          let userId = response.data.userId;
          console.log(userId);
          console.log(token);
          sessionStorage.setItem('userId', userId);
          sessionStorage.setItem('token', token);
          navigate('/Photop');
        }
      })
      .catch((error) => {
        console.log(error);
        alert('An error occurred. Please try again.');
      });
  };

  return (
    <div>
      <center>
        <h2>
          <b>LOGIN</b>
        </h2>
      </center>
      <br />
      <div className="container">
        <div className="row">
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <div className="row g-3">
              <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                <form action="" className="label-form">
                  Email
                </form>
                <input
                  type="text"
                  className="form-control"
                  name="Email"
                  value={data.Email}
                  onChange={inputHandler}
                />
              </div>
              <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                <form action="" className="label-form">
                  Password
                </form>
                <input
                  type="password"
                  className="form-control"
                  name="Password"
                  value={data.Password}
                  onChange={inputHandler}
                />
              </div>
              <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                <br />
                <button className="btn btn-success" onClick={readValue}>
                  Login
                </button>
                <br />
              </div>
              <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                <a href="/" className="btn btn-secondary">
                  home
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;