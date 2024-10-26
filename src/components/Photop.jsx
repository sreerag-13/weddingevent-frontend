import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUserEdit, FaSave, FaTimes, FaPhone, FaMapMarkedAlt, FaCity } from 'react-icons/fa'; // Importing icons
import NavP from './NavP';

const Photop = () => {
  const [data, setData] = useState({
    PName: '',
    Email: '',
    Phone: '',
    experience: '',
    Paddress: '',
    state: '',
    City: '',
    Description: '',
    Pimage:''
  });

  const [isEditing, setIsEditing] = useState(false);

  // Load photographer data from sessionStorage when the component mounts
  useEffect(() => {
    const photographerData = {
      PName: sessionStorage.getItem('PName') || 'Not provided',
      Email: sessionStorage.getItem('Email') || 'Not provided',
      Phone: sessionStorage.getItem('Phone') || 'Not provided',
      experience: sessionStorage.getItem('experience') || 'Not provided',
      Paddress: sessionStorage.getItem('Paddress') || 'Not provided',
      state: sessionStorage.getItem('state') || 'Not provided',
      City: sessionStorage.getItem('City') || 'Not provided',
      Description: sessionStorage.getItem('Description') || 'Not provided',
      Pimage: sessionStorage.getItem('Pimage') || 'Not provided'
    };
    setData(photographerData);
  }, []);

  // Handle input changes in form
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission to update photographer data
  const handleSubmit = async (event) => {
    event.preventDefault();
    const userId = sessionStorage.getItem('userId');

    try {
      const response = await axios.put(`http://localhost:8082/api/photographer/update/${userId}`, data);
      if (response.data.status === 'success') {
        alert('Photographer details updated successfully!');
        setIsEditing(false);
        // Update sessionStorage with new data
        sessionStorage.setItem('PName', data.PName);
        sessionStorage.setItem('Phone', data.Phone);
        sessionStorage.setItem('Paddress', data.Paddress);
        sessionStorage.setItem('state', data.state);
        sessionStorage.setItem('City', data.City);
        sessionStorage.setItem('experience', data.experience);
        sessionStorage.setItem('Description', data.Description);
      } else {
        alert('Error updating photographer details.');
      }
    } catch (error) {
      console.error('Error updating photographer details:', error);
      alert('An error occurred. Please try again.');
    }
  };

  // Retrieve profile picture from sessionStorage
  const Pimage = sessionStorage.getItem('Pimage');

  return (
    <div className="d-flex" style={{ height: '100vh', backgroundColor: '#f0f2f5' }}>
      <NavP />
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
                <FaUserEdit className="me-2" /> Edit Photographer Profile
              </h3>

              {/* Display Profile Picture */}
              {Pimage && (
                <div className="text-center mb-4">
                  <img
                    src={`http://localhost:8082/images/${data.Pimage}`}
                    alt="Profile"
                    style={{ borderRadius: '50%', width: '150px', height: '150px', objectFit: 'cover' }} // Styling for the image
                  />
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="PName" className="form-label">
                      <FaUserEdit className="me-2" /> Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="PName"
                      value={data.PName}
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
                    <label htmlFor="Paddress" className="form-label">
                      <FaMapMarkedAlt className="me-2" /> Address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="Paddress"
                      value={data.Paddress}
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

                <div className="row">
                  <div className="col-md-12 mb-3">
                    <label htmlFor="experience" className="form-label">
                      <FaUserEdit className="me-2" /> Experience
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="experience"
                      value={data.experience}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      style={{ borderRadius: '10px' }}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12 mb-3">
                    <label htmlFor="Description" className="form-label">
                      <FaUserEdit className="me-2" /> Description
                    </label>
                    <textarea
                      className="form-control"
                      name="Description"
                      value={data.Description}
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
                      <FaSave className="me-2" /> Save
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Photop;
