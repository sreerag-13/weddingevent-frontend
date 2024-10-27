import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUserEdit, FaSave, FaTimes, FaPhone, FaMapMarkedAlt, FaCity } from 'react-icons/fa';
import Navcat from './Navcat';
import './Caterp.css';

const Caterp = () => {
  const [data, setData] = useState({
    CName: '',
    Email: '',
    Phone: '',
    Caddress: '',
    state: '',
    City: '',
    experience: '',
    Description: '',
    Cimage: ''
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const cateringData = {
      CName: sessionStorage.getItem('CName') || 'Not provided',
      Phone: sessionStorage.getItem('Phone') || 'Not provided',
      Cimage: sessionStorage.getItem('Cimage') || 'Not provided'
    };
    setData(cateringData);
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
      const response = await axios.put(`http://localhost:8082/api/catering/update/${userId}`, data);
      if (response.data.status === 'success') {
        alert('Catering details updated successfully!');
        setIsEditing(false);
        sessionStorage.setItem('CName', data.CName);
        sessionStorage.setItem('Phone', data.Phone);
        sessionStorage.setItem('Caddress', data.Caddress);
        sessionStorage.setItem('state', data.state);
        sessionStorage.setItem('City', data.City);
        sessionStorage.setItem('experience', data.experience);
        sessionStorage.setItem('Description', data.Description);
      } else {
        alert('Error updating catering details.');
      }
    } catch (error) {
      console.error('Error updating catering details:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="caterp-container">
      <Navcat />
      <div className="caterp-content">
        <div className="card shadow-lg p-4">
          <h3 className="card-title text-center mb-4">
            <FaUserEdit className="me-2" /> Edit Catering Profile
          </h3>
          {data.Cimage && (
            <div className="text-center mb-4">
              <img
                src={`http://localhost:8082/uploads/${data.Cimage}`}
                alt="Catering"
                className="profile-image"
              />
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">
                  <FaUserEdit className="me-2" /> Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="CName"
                  value={data.CName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">
                  <FaPhone className="me-2" /> Phone
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="Phone"
                  value={data.Phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">
                  <FaMapMarkedAlt className="me-2" /> Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="Caddress"
                  value={data.Caddress}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">
                  <FaCity className="me-2" /> City
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="City"
                  value={data.City}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
            </div>
            <div className="text-center mt-4">
              <button
                type="button"
                className={`btn btn-${isEditing ? 'secondary' : 'warning'} me-2`}
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? <><FaTimes className="me-2" /> Cancel</> : <><FaUserEdit className="me-2" /> Edit</>}
              </button>
              {isEditing && (
                <button type="submit" className="btn btn-success ms-2">
                  <FaSave className="me-2" /> Save
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Caterp;
