import React, { useState, useEffect } from 'react';
import Nav2 from './Nav2'; // Assuming Nav2 is the navigation component used

const Adminp = () => {
  const [adminData, setAdminData] = useState({
    aName: '',
    Email: '',
  });

  // Load admin data from sessionStorage when component mounts
  useEffect(() => {
    const data = {
      aName: sessionStorage.getItem('aName') || 'Admin',
      Email: sessionStorage.getItem('Email') || 'Not provided',
    };
    setAdminData(data);
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Nav2 />

      {/* Welcome Message */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#2196F3',
          color: '#fff',
          fontSize: '32px',
          fontWeight: '600',
          height: '80px',
          width: '100%',
        }}
      >
        <span>Welcome Admin</span>
      </div>

      {/* Display additional admin info */}
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h3>Email: {adminData.Email}</h3>
      </div>
    </div>
  );
};

export default Adminp;
