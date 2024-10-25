import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav2 from './Nav2';
import { FaUserEdit, FaSave, FaTimes, FaPhone, FaMapMarkedAlt, FaCity } from 'react-icons/fa'; // Importing icons

const Userp = () => {
  const [data, setData] = useState({
    UName: '',
    Email: '',
    Phone: '',
    Gender: '',
    uaddress: '',
    state: '',
    City: '',
  });

  const [isEditing, setIsEditing] = useState(false);

  // Load user data from sessionStorage when the component mounts
  useEffect(() => {
    const userData = {
      UName: sessionStorage.getItem('UName') || 'Guest User',
      Email: sessionStorage.getItem('Email') || 'Not provided',
      Phone: sessionStorage.getItem('Phone') || 'Not provided',
      Gender: sessionStorage.getItem('Gender') || 'Not provided',
      uaddress: sessionStorage.getItem('uaddress') || 'Not provided',
      state: sessionStorage.getItem('state') || 'Not provided',
      City: sessionStorage.getItem('City') || 'Not provided',
    };
    setData(userData);
  }, []);

  // Handle input changes in form
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission to update user data
  const handleSubmit = async (event) => {
    event.preventDefault();
    const userId = sessionStorage.getItem('userId');

    try {
      const response = await axios.put(`http://localhost:8082/api/user/update/${userId}`, data);
      if (response.data.status === 'success') {
        alert('User details updated successfully!');
        setIsEditing(false);
        // Update sessionStorage with new data
        sessionStorage.setItem('UName', data.UName);
        sessionStorage.setItem('Phone', data.Phone);
        sessionStorage.setItem('uaddress', data.uaddress);
        sessionStorage.setItem('state', data.state);
        sessionStorage.setItem('City', data.City);
      } else {
        alert('Error updating user details.');
      }
    } catch (error) {
      console.error('Error updating user details:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="d-flex" style={{ height: '100vh', backgroundColor: '#f0f2f5' }}>
      <Nav2 />
      {/* Expanded full-width card section */}
      <div className="container-fluid mt-4" style={{ marginLeft: '250px', width: 'calc(100% - 250px)' }}>
        <div className="row justify-content-center">
          <div className="col-12"> {/* Full-width card */}
            {/* Card for Form */}
            <div
              className="card shadow-lg p-4 animate__animated animate__fadeInUp"
              style={{
                borderRadius: '15px',
                backgroundColor: '#fff',
                padding: '30px',
                width: '100%', // Full width
                maxWidth: '1200px', // Max width to avoid stretching too much on very large screens
                margin: '0 auto', // Center the card horizontally
              }}
            >
              <h3
                className="card-title text-center mb-4"
                style={{ fontWeight: '600', color: '#333' }}
              >
                <FaUserEdit className="me-2" /> Edit User Profile
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="UName" className="form-label">
                      <FaUserEdit className="me-2" /> Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="UName"
                      value={data.UName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      style={{ borderRadius: '10px' }}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="Phone" className="form-label">
                      <FaPhone className="me-2" /> Phone
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="Phone"
                      value={data.Phone}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      style={{ borderRadius: '10px' }}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12 mb-3">
                    <label htmlFor="uaddress" className="form-label">
                      <FaMapMarkedAlt className="me-2" /> Address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="uaddress"
                      value={data.uaddress}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      style={{ borderRadius: '10px' }}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="state" className="form-label">
                      <FaMapMarkedAlt className="me-2" /> State
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="state"
                      value={data.state}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      style={{ borderRadius: '10px' }}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="City" className="form-label">
                      <FaCity className="me-2" /> City
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="City"
                      value={data.City}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      style={{ borderRadius: '10px' }}
                    />
                  </div>
                </div>

                {/* Buttons */}
                <div className="text-center mt-4">
                  <button
                    type="button"
                    className={`btn btn-${isEditing ? 'secondary' : 'warning'} me-2 px-4 py-2`}
                    onClick={() => setIsEditing(!isEditing)}
                    style={{ borderRadius: '10px' }}
                  >
                    {isEditing ? (
                      <>
                        <FaTimes className="me-2" /> Cancel
                      </>
                    ) : (
                      <>
                        <FaUserEdit className="me-2" /> Edit
                      </>
                    )}
                  </button>
                  {isEditing && (
                    <button type="submit" className="btn btn-success ms-2 px-4 py-2" style={{ borderRadius: '10px' }}>
                      <FaSave className="me-2" /> Save Changes
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-auto py-3 bg-light">
        <div className="container text-center">
          <span className="text-muted">© 2024 Your Company. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
};

export default Userp;
