import React, { useState } from 'react';
import axios from 'axios';

const Cateringsignup = () => {
    const [data, setData] = useState({
        CName: '',
        Email: '',
        Password: '',
        Phone: '',
        Caddress: '',
        state: '',
        City: '',
        experience: '',
        Description: '',
        Cimage: null,
    });

    const stateCityMap = {
        'Andhra Pradesh': ['Amaravati', 'Visakhapatnam', 'Vijayawada', 'Tirupati', 'Guntur', 'Kakinada', 'Rajahmundry'],
        'Karnataka': ['Bengaluru', 'Mysuru', 'Mangalore', 'Belgaum', 'Hubli', 'Dharwad', 'Udupi'],
        'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad', 'Thane', 'Solapur'],
        'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Salem', 'Tiruchirappalli', 'Erode', 'Vellore'],
        'Kerala': ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Thrissur', 'Kollam', 'Malappuram', 'Palakkad'],
        'Delhi': ['New Delhi'],
        'Telangana': ['Hyderabad', 'Warangal', 'Nizamabad', 'Khammam', 'Karimnagar', 'Ramagundam', 'Mahbubnagar'],
        'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Jamnagar', 'Gandhinagar'],
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

        axios.post('http://localhost:8082/catering-signup', formData)
            .then(() => {
                alert('Catering registered successfully!');
                window.location.href = '/';
            })
            .catch((error) => {
                console.error('Error with registration:', error);
                alert('An error occurred. Please try again.');
            });
    };

    return (
        <div className="container">
            <h1 className="text-center">Catering Service Registration</h1>
            <div className="row g-3">
                <div className="col col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                    <label>Catering Name:</label>
                    <input type="text" className="form-control" name="CName" onChange={inputHandler} required />
                </div>
                <div className="col col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                    <label>Email:</label>
                    <input type="email" className="form-control" name="Email" onChange={inputHandler} required />
                </div>
                <div className="col col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                    <label>Password:</label>
                    <input type="password" className="form-control" name="Password" onChange={inputHandler} required />
                </div>
                <div className="col col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                    <label>Phone:</label>
                    <input type="text" className="form-control" name="Phone" onChange={inputHandler} required />
                </div>
                <div className="col col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                    <label>Address:</label>
                    <input type="text" className="form-control" name="Caddress" onChange={inputHandler} required />
                </div>
                <div className="col col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                    <label>State:</label>
                    <select className="form-select" name="state" onChange={inputHandler} required>
                        <option value="">Select State</option>
                        {Object.keys(stateCityMap).map((state) => (
                            <option key={state} value={state}>{state}</option>
                        ))}
                    </select>
                </div>
                <div className="col col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                    <label>City:</label>
                    <select className="form-select" name="City" onChange={inputHandler} required disabled={!data.state}>
                        <option value="">Select City</option>
                        {data.state && stateCityMap[data.state].map((city) => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>
                </div>
                <div className="col col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                    <label>Experience (in years):</label>
                    <input type="text" className="form-control" name="experience" onChange={inputHandler} required />
                </div>
                <div className="col col-12">
                    <label>Description:</label>
                    <textarea className="form-control" name="Description" onChange={inputHandler} rows="3" required></textarea>
                </div>
                <div className="col col-12">
                    <label>Upload Image:</label>
                    <input type="file" className="form-control" name="Cimage" onChange={inputHandler} required />
                </div>
                <div className="col col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mt-3">
                    <button className="btn btn-primary" onClick={handleSubmit}>Register</button>
                </div>
                <div className="col col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mt-3">
                    <button className="btn btn-secondary" onClick={() => window.location.href = '/'}>Home</button>
                </div>
            </div>
        </div>
    );
};

export default Cateringsignup;
