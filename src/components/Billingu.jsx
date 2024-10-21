import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Billingu.css'; // Import the CSS file for styling

const Billingu = () => {
  const [billingSummary, setBillingSummary] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBillingSummary = async () => {
      const userId = sessionStorage.getItem('userId'); // Assuming userId is stored in sessionStorage

      if (!userId) {
        setError('User ID not found. Please log in again.');
        return;
      }

      try {
        const response = await axios.post('http://localhost:8082/api/user/billing', { userId });

        if (response.data.billingSummary) {
          setBillingSummary(response.data.billingSummary);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        console.error('Error fetching billing summary:', err);
        setError('Unable to fetch billing summary.');
      }
    };

    fetchBillingSummary();
  }, []);

  return (
    <div className="billing-container">
      <h2>Billing Summary</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {Object.entries(billingSummary).length > 0 ? (
        Object.entries(billingSummary).map(([date, costs]) => (
          <div key={date} className="billing-card">
            <h3>Date: {date}</h3>
            <p>Auditorium Cost: ₹{costs.auditorium || 0}</p>
            <p>Photographer Cost: ₹{costs.photographer || 0}</p>
            <p>Total Cost: ₹{costs.totalCost || 0}</p>
          </div>
        ))
      ) : (
        <div className="billing-card">
          <p>No billing summary available.</p>
        </div>
      )}
    </div>
  );
};

export default Billingu;
