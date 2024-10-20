import React, { useEffect, useState } from 'react';
import axios from 'axios'; // For API requests
import './Statusu.css'; // Optional: For custom styling

const Statusu = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = sessionStorage.getItem('userId'); // Assuming you store userId in sessionStorage

  // Fetch bookings from the backend
  useEffect(() => {
    const fetchBookings = async () => {
      if (!userId) {
        setError('User ID is not found in session storage.');
        setLoading(false);
        return;
      }

      try {
        console.log('User ID:', userId); // Log the userId for debugging
        const response = await axios.post('http://localhost:8082/api/user/bookings', { userId });
        
        // Log the full response
        console.log('Response:', response.data); 

        // Check if the bookings exist in the response
        if (response.data && response.data.bookings) {
          console.log('Bookings:', response.data.bookings); // Log bookings
          setBookings(response.data.bookings);
        } else {
          throw new Error('No bookings found in the response.');
        }
      } catch (err) {
        console.error('Error fetching bookings:', err);
        setError('Failed to load bookings. Please try again.'); // Set error message
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userId]);

  // Render loading state
  if (loading) return <p>Loading bookings...</p>;

  // Render error state
  if (error) return <p style={{ color: 'red' }}>{error}</p>; // Print error in red color

  return (
    <div className="statusu-container">
      <h2>Your Bookings</h2>
      <table className="statusu-table">
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Photographer Name</th>
            <th>Photographer Email</th>
            <th>Total Cost</th>
            <th>Booking Dates</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking._id}</td>
                <td>{booking.photographerName || 'N/A'}</td>
                <td>{booking.photographerEmail || 'N/A'}</td>
                <td>₹{booking.totalCost}</td>
                <td>
                  {booking.bookingDates.map((date, index) => (
                    <span key={index}>{new Date(date).toLocaleDateString()}</span>
                  ))}
                </td>
                <td>{booking.status || 'Pending'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No bookings found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Statusu;
