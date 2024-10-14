import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Cardsp.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const Cardsp = () => {
  const [photographers, setPhotographers] = useState([]);
  const navigate = useNavigate(); // Use useNavigate for navigation

  // Function to fetch all photographers from the backend
  const fetchPhotographers = async () => {
    try {
      const response = await axios.post('http://localhost:8082/viewallp'); // Make sure to use the correct port
      console.log('Photographers fetched:', response.data); // Debugging log
      setPhotographers(response.data);
    } catch (error) {
      console.error('Error fetching photographers:', error.message);
    }
  };

  // Fetch photographers when component mounts
  useEffect(() => {
    fetchPhotographers();
  }, []);

  // Function to handle the view button click
  const handleViewPosts = (userId) => {
    // Navigate to the Bookp component, passing userId as a URL parameter
    navigate(`/user-posts/${userId}`);
  };

  return (
    <div className="cardsp-container">
      <h2>Registered Photographers</h2>
      {photographers.length === 0 ? (
        <p>No photographers found.</p>
      ) : (
        <div className="cards-wrapper">
          {photographers.map((photographer) => (
            <div className="card" key={photographer._id}>
              <img
                src={`http://localhost:8082/images/${photographer.Pimage}`} // Updated to use the images folder
                alt={photographer.PName}
                className="card-image"
              />
              <h3>{photographer.PName}</h3>
              <p><strong>City:</strong> {photographer.City}</p>
              <p><strong>State:</strong> {photographer.state}</p>
              <p><strong>Experience:</strong> {photographer.experience}</p>
              <button 
                className="view-button" 
                onClick={() => handleViewPosts(photographer._id)} // Pass the userId
              >
                View
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cardsp;
