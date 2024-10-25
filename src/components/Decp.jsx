import React, { useState } from 'react';
import Nav3 from './Nav3';
import Navd from './Navd';

const Decp = () => {
  const [data, setData] = useState({
    dimage: sessionStorage.getItem('dimage'), // Get image file name from sessionStorage
    dName: sessionStorage.getItem('dName'),
    Phone: sessionStorage.getItem('Phone'), // Get phone from sessionStorage
    daddress: sessionStorage.getItem('daddress'),
    state: sessionStorage.getItem('state'),
    City: sessionStorage.getItem('City'),
    experience: sessionStorage.getItem('experience'),
    Description: sessionStorage.getItem('Description')
  });

  return (
    <div>
      <Navd />
      <div
        className="decorator-profile"
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
          src={`http://localhost:8082/uploads/${data.dimage}`} // Load image from local server
          style={{
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            marginBottom: '20px',
          }}
          alt="Decorator"
        />
        <div
          className="decorator-information"
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
            {data.dName} {/* Display name */}
          </h2>
         {/* <p>Phone: {data.Phone}</p> {/* Display phone number */}
          {/*<p>Address: {data.daddress}, {data.City}, {data.state}</p> {/* Display address */}
          <p>Experience: {data.experience} years</p> {/* Display experience */}
          <p>Description: {data.Description}</p> {/* Display description */} 
        </div>
      </div>
    </div>
  );
};

export default Decp;
