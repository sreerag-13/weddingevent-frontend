import React, { useState, useEffect } from 'react';
import Nav2 from './Nav2';

const Userp = () => {
  // Initialize state with user data from sessionStorage
  const [data, setData] = useState({
    UName: '',
    Email: '',
    Phone: '',
    Gender: '',
    uaddress: '',
    state: '',
    City: '',
  });

  // Load user data from sessionStorage on component mount
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

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Nav2 />

      {/* Full-width welcome box */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#4CAF50',
          color: '#fff',
          fontSize: '32px',
          fontWeight: '600',
          height: '80px',
          width: '100%',
        }}
      >
        <span>Welcome, {data.UName}!</span>
      </div>

   
    </div>
  );
};

export default Userp;
