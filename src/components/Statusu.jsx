import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Nav2 from './Nav2'; // Assuming you have a Nav2 component for the navbar

const Statusu = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = sessionStorage.getItem('userId'); // Assuming you store userId in sessionStorage

  useEffect(() => {
    const fetchBookings = async () => {
      if (!userId) {
        setError('User ID is not found in session storage.');
        setLoading(false);
        return;
      }

      try {
        console.log('User ID:', userId);
        const response = await axios.post('http://localhost:8082/api/user/bookings', { userId });
        
        console.log('Response:', response.data);

        if (response.data && response.data.bookings) {
          console.log('Bookings:', response.data.bookings);
          setBookings(response.data.bookings);
        } else {
          throw new Error('No bookings found in the response.');
        }
      } catch (err) {
        console.error('Error fetching bookings:', err);
        setError('Failed to load bookings. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userId]);

  if (loading) return <p>Loading bookings...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <Nav2 /> {/* Add the Nav2 component for navigation */}
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', marginLeft: '18%' }}>
        <h2 style={{ textAlign: 'center' }}>Your Bookings</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2', color: '#333' }}>Booking ID</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2', color: '#333' }}>Entity Name</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2', color: '#333' }}>Entity Email</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2', color: '#333' }}>Total Cost</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2', color: '#333' }}>Booking Dates</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2', color: '#333' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <tr key={booking._id} style={{ backgroundColor: booking._id % 2 === 0 ? '#f9f9f9' : '#fff' }}>
                  <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{booking._id}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{booking.entityName || 'N/A'}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{booking.entityEmail || 'N/A'}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>₹{booking.totalCost}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
                    {booking.bookingDates.map((date, index) => (
                      <span key={index}>{new Date(date).toLocaleDateString()}</span>
                    ))}
                  </td>
                  <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{booking.status || 'Pending'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>No bookings found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Statusu;
