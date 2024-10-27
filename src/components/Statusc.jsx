import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navcat from './Navcat'; // Import your Navcat component

const Statusc = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      const catererId = sessionStorage.getItem('userId'); // Get caterer ID from session storage
      if (!catererId) {
        setError('Caterer ID not found. Please log in again.');
        return;
      }

      try {
        const response = await axios.post('http://localhost:8082/api/bookings/fetch/caterer', {
          catererId,
        });

        if (response.data.bookings) {
          setBookings(response.data.bookings);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        console.error('Error fetching bookings:', err);
        setError('Unable to fetch bookings.');
      }
    };

    fetchBookings();
  }, []);

  const handleConfirm = async (bookingId) => {
    try {
      const response = await axios.put(`http://localhost:8082/api/bookings/caterer/status/${bookingId}`, {
        status: 'confirmed',
      });

      if (response.data.booking) {
        // Update the booking list with the new status
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking._id === bookingId ? { ...booking, status: 'confirmed' } : booking
          )
        );
        alert('Booking confirmed!');
      }
    } catch (err) {
      console.error('Error confirming booking:', err);
      alert('Unable to confirm booking.');
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', margin: '20px', marginLeft: '20%' }}>
      <Navcat /> {/* Add the Navcat component here */}
      <h2 style={{ textAlign: 'center', color: '#333' }}>Catering Bookings</h2>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      <table
        border="1"
        cellPadding="10"
        cellSpacing="0"
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginTop: '20px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <thead>
          <tr style={{ backgroundColor: '#f4f4f4', textAlign: 'left' }}>
            <th style={{ padding: '10px' }}>User Name</th>
            <th style={{ padding: '10px' }}>User Email</th>
            <th style={{ padding: '10px' }}>Total Cost</th>
            <th style={{ padding: '10px' }}>Booking Dates</th>
            <th style={{ padding: '10px' }}>Status</th>
            <th style={{ padding: '10px' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{booking.userName}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{booking.userEmail}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>₹{booking.totalCost}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                {booking.bookingDates.join(', ')}
              </td>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{booking.status}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                {booking.status === 'pending' && (
                  <button
                    onClick={() => handleConfirm(booking._id)}
                    style={{
                      padding: '5px 10px',
                      backgroundColor: '#28a745',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                    }}
                  >
                    Confirm
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Statusc;
