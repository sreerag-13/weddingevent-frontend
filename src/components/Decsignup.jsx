import React, { useState } from 'react';
import axios from 'axios';

const Decsignup = () => {
    const [data, setData] = useState({
        dName: '',
        Email: '',
        Password: '',
        Phone: '',
        daddress: '',
        state: '',
        City: '',
        experience: '',
        Description: '',
        dimage: null,
    });

    const stateCityMap = {
        'Andhra Pradesh': ['Amaravati', 'Visakhapatnam', 'Vijayawada', 'Tirupati', 'Guntur', 'Nellore', 'Kakinada', 'Kadapa', 'Rajahmundry', 'Eluru'],
        'Arunachal Pradesh': ['Itanagar', 'Naharlagun', 'Pasighat', 'Aalo', 'Ziro', 'Bomdila', 'Tezpur', 'Dirang', 'Changlang', 'Tawang'],
        // Add all other states and cities similarly...
    };

    const inputHandler = (event) => {
        const { name, value, type, files } = event.target;
        if (type === 'file') {
            setData({ ...data, [name]: files[0] });
        } else {
            setData({ ...data, [name]: value });
        }
    };

    const handleSubmit = () => {
        const formData = new FormData();
        for (let key in data) {
            formData.append(key, data[key]);
        }

        axios.post('http://localhost:8082/decorationsignup', formData)
            .then((response) => {
                if (response.data.status === 'success') {
                    alert('Decorator registration successful!');
                    window.location.href = '/';
                } else {
                    alert(response.data.message);
                }
            })
            .catch((error) => {
                console.error('Error with registration:', error);
                alert('An error occurred. Please try again.');
            });
    };

    return (
        <div className="container">
            <h1 className="text-center">Decoration Registration</h1>
            <div className="row g-3">
                <div className="col col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mt-3">
                    <label>Decoration Name:</label>
                    <input type="text" className="form-control" name="dName" onChange={inputHandler} required />
                </div>
                <div className="col col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mt-3">
                    <label>Email:</label>
                    <input type="email" className="form-control" name="Email" onChange={inputHandler} required />
                </div>
                <div className="col col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mt-3">
                    <label>Password:</label>
                    <input type="password" className="form-control" name="Password" onChange={inputHandler} required />
                </div>
                <div className="col col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mt-3">
                    <label>Phone:</label>
                    <input type="text" className="form-control" name="Phone" onChange={inputHandler} required />
                </div>
                <div className="col col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mt-3">
                    <label>Address:</label>
                    <input type="text" className="form-control" name="daddress" onChange={inputHandler} required />
                </div>
                <div className="col col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mt-3">
                    <label>State:</label>
                    <select className="form-select" name="state" onChange={inputHandler} required>
                        <option value="">Select State</option>
                        {Object.keys(stateCityMap).map((state) => (
                            <option key={state} value={state}>{state}</option>
                        ))}
                    </select>
                </div>
                <div className="col col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mt-3">
                    <label>City:</label>
                    <select className="form-select" name="City" onChange={inputHandler} required disabled={!data.state}>
                        <option value="">Select City</option>
                        {data.state && stateCityMap[data.state].map((city) => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>
                </div>
                <div className="col col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mt-3">
                    <label>Experience:</label>
                    <input type="text" className="form-control" name="experience" onChange={inputHandler} required />
                </div>
                <div className="col col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mt-3">
                    <label>Description:</label>
                    <textarea className="form-control" name="Description" onChange={inputHandler} required></textarea>
                </div>
                <div className="col col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mt-3">
                    <label>Upload Image:</label>
                    <input type="file" className="form-control" name="dimage" onChange={inputHandler} required />
                </div>

                {/* Submit and Home Buttons */}
                <div className="col col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mt-3">
                    <button className="btn btn-primary" onClick={handleSubmit}>Register</button>
                </div>
                <div className="col col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mt-3">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => window.location.href = '/'}
                    >
                        Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Decsignup;
