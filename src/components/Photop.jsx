import React, { useState } from 'react';
import NavP from './NavP';

const Photop = () => {
  const [data, setData] = useState({
    Pimage: sessionStorage.getItem('Pimage'), // Get image file name from sessionStorage
    PName: sessionStorage.getItem('PName'),
    Phone: sessionStorage.getItem('Phone')   // Get name from sessionStorage
  });

  return (
    <div>
      <NavP/>
      <div
        className="photographer-profile"
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
          src={`http://localhost:8082/images/${data.Pimage}`} // Load image from local server
          style={{
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            marginBottom: '20px',
          }}
        />
        <div
          className="photographer-information"
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
            {data.PName} {/* Display name */}
          </h2>
    
        </div>
      </div>
    </div>
  );
};

export default Photop;