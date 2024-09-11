import React, { useState } from 'react'
const Login = () => {
    const[data,setData]=useState({
        "Email":"",
        "Password":""

    })
 const inputHandler = (event) => {
        setData({ ...data, [event.target.name]: event.target.value })
    }
    const readValue = () => {
        console.log(data)
    }
   
        return (
            <div>
                <center><h2><b>LOGIN</b></h2></center><br />
                <div className="container">
                    <div className="row">
                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                            <div className="row g-3">
                                <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                    <form action="" className="label-form">Email</form>
                                    <input type="text" className="form-control" name='Email' value={data.Email} onChange={inputHandler} />
                                </div>
                                <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                    <form action="" className="label-form">Password</form>
                                    <input type="password" className="form-control" name='Password' value={data.Password} onChange={inputHandler} />
                                </div>
                                <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12"><br />
                                    <button className="btn btn-success" onClick={readValue}>Login</button>
                                    <br />
                                </div>
                                <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                            <a href="/" className="btn btn-secondary">home</a>
                        </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }

    export default Login
