import React, { useState } from 'react';
import Navcat from './Navcat';

const Caterp = () => {
  const [data, setData] = useState({
    Cimage: sessionStorage.getItem('Cimage'), // Get catering image file name from sessionStorage
    CName: sessionStorage.getItem('CName'), // Get catering name from sessionStorage
    Phone: sessionStorage.getItem('Phone') // Get phone from sessionStorage
  });

  return (
    <div>
      <Navcat />
      <div
        className="catering-profile"
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
          src={`http://localhost:8082/uploads/${data.Cimage}`} // Load image from local server
          style={{
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            marginBottom: '20px',
          }}
          alt="Catering"
        />
        <div
          className="catering-information"
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
            {data.CName} {/* Display catering name */}
          </h2>
          <p>Phone: {data.Phone}</p> {/* Display phone number */}
        </div>
      </div>
    </div>
  );
};

export default Caterp;
