import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUserEdit, FaSave, FaTimes, FaPhone, FaMapMarkedAlt, FaCity } from 'react-icons/fa';
import Nav3 from './Nav3';

const Auditp = () => {
  const [data, setData] = useState({
    aName: '',
    Email: '',
    Phone: '',
    experience: '',
    aaddress: '',
    state: '',
    City: '',
    Description: '',
    aimage: ''
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const auditoriumData = {
      aName: sessionStorage.getItem('aName') || 'Not provided',
      Email: sessionStorage.getItem('Email') || 'Not provided',
      Phone: sessionStorage.getItem('Phone') || 'Not provided',
      experience: sessionStorage.getItem('experience') || 'Not provided',
      aaddress: sessionStorage.getItem('aaddress') || 'Not provided',
      state: sessionStorage.getItem('state') || 'Not provided',
      City: sessionStorage.getItem('City') || 'Not provided',
      Description: sessionStorage.getItem('Description') || 'Not provided',
      aimage: sessionStorage.getItem('aimage') || 'Not provided'
    };
    setData(auditoriumData);
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userId = sessionStorage.getItem('userId');

    try {
      const response = await axios.put(`http://localhost:8082/api/auditorium/update/${userId}`, data);
      if (response.data.status === 'success') {
        alert('Auditorium details updated successfully!');
        setIsEditing(false);
        sessionStorage.setItem('aName', data.aName);
        sessionStorage.setItem('Phone', data.Phone);
        sessionStorage.setItem('aaddress', data.aaddress);
        sessionStorage.setItem('state', data.state);
        sessionStorage.setItem('City', data.City);
        sessionStorage.setItem('experience', data.experience);
        sessionStorage.setItem('Description', data.Description);
      } else {
        alert('Error updating auditorium details.');
      }
    } catch (error) {
      console.error('Error updating auditorium details:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const aimage = sessionStorage.getItem('aimage');

  return (
    <div className="d-flex" style={{ height: '100vh', backgroundColor: '#f0f2f5' }}>
      <Nav3 />
      <div className="container-fluid mt-4" style={{ marginLeft: '250px', width: 'calc(100% - 250px)' }}>
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="card shadow-lg p-4 animate__animated animate__fadeInUp"
              style={{
                borderRadius: '15px',
                backgroundColor: '#fff',
                padding: '30px',
                width: '100%',
                maxWidth: '1200px',
                margin: '0 auto',
              }}
            >
              <h3 className="card-title text-center mb-4" style={{ fontWeight: '600', color: '#333' }}>
                <FaUserEdit className="me-2" /> Edit Auditorium Profile
              </h3>

              {aimage && (
                <div className="text-center mb-4">
                  <img
                    src={`http://localhost:8082/uploads/${data.aimage}`}
                    alt="Auditorium"
                    style={{ borderRadius: '50%', width: '150px', height: '150px', objectFit: 'cover' }}
                  />
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Name and Phone fields */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="aName" className="form-label">
                      <FaUserEdit className="me-2" /> Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="aName"
                      value={data.aName}
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

                {/* Address fields */}
                <div className="row">
                  <div className="col-md-12 mb-3">
                    <label htmlFor="aaddress" className="form-label">
                      <FaMapMarkedAlt className="me-2" /> Address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="aaddress"
                      value={data.aaddress}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      style={{ borderRadius: '10px' }}
                    />
                  </div>
                </div>

                {/* State and City fields */}
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

                {/* Experience and Description fields */}
                <div className="row">
                  <div className="col-md-6 mb-3">
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
                  <div className="col-md-6 mb-3">
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

export default Auditp;
