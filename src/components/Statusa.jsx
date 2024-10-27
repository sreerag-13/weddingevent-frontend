import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav3 from './Nav3'; // Import the Nav3 component

const Statusa = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      const auditoriumId = sessionStorage.getItem('userId'); // Get auditorium ID from session storage
      if (!auditoriumId) {
        setError('User ID not found. Please log in again.');
        return;
      }

      try {
        const response = await axios.post('http://localhost:8082/api/bookings/fetch/auditorium', {
          auditoriumId,
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
      const response = await axios.put(`http://localhost:8082/api/bookings/status/${bookingId}`, {
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
    <div style={{ display: 'flex' }}>
      <Nav3 /> {/* Include the Nav3 navigation component */}
      <div className="container" style={{ marginLeft: '60%', padding: '20px' }}>
        <h2 style={{ color: '#e91e63', marginBottom: '20px' }}>Auditorium Bookings</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <table 
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          }}
        >
          <thead>
            <tr style={{ backgroundColor: '#e91e63', color: '#fff' }}>
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
              <tr key={booking._id} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '10px' }}>{booking.userName}</td>
                <td style={{ padding: '10px' }}>{booking.userEmail}</td>
                <td style={{ padding: '10px' }}>₹{booking.totalCost}</td>
                <td style={{ padding: '10px' }}>{booking.bookingDates.join(', ')}</td>
                <td style={{ padding: '10px' }}>{booking.status}</td>
                <td style={{ padding: '10px' }}>
                  {booking.status === 'pending' && (
                    <button 
                      onClick={() => handleConfirm(booking._id)}
                      style={{
                        backgroundColor: '#4CAF50', /* Green */
                        color: 'white',
                        border: 'none',
                        padding: '8px 12px',
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
    </div>
  );
};

export default Statusa;
