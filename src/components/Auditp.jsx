import React, { useState } from 'react';
import Nav3 from './Nav3';

const Auditp = () => {
  const [data, setData] = useState({
    aimage: sessionStorage.getItem('aimage'), // Get image file name from sessionStorage
    aName: sessionStorage.getItem('aName'),
    Phone: sessionStorage.getItem('Phone') // Get phone from sessionStorage
  });

  return (
    <div>
      <Nav3 />
      <div
        className="auditorium-profile"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '20px',
          backgroundColor: '#f7f7f7',
          border: '1px solid #ddd',
          borderRadius: '10px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Image source using sessionStorage */}
        <img
          src={`http://localhost:8082/uploads/${data.aimage}`} // Load image from local server
          style={{
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            marginBottom: '20px',
          }}
          alt="Auditorium"
        />
        <div
          className="auditorium-information"
          style={{
            textAlign: 'center',
          }}
        >
          <h2
            style={{
              fontSize: '24px',
              fontWeight: 'bold',
              marginBottom: '10px',
            }}
          >
            {data.aName} {/* Display name */}
          </h2>
          <p>Phone: {data.Phone}</p> {/* Display phone number */}
        </div>
      </div>
    </div>
  );
};

export default Auditp;
