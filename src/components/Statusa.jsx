import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    <div>
      <h2>Auditorium Bookings</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>User Name</th>
            <th>User Email</th>
            <th>Total Cost</th>
            <th>Booking Dates</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td>{booking.userName}</td>
              <td>{booking.userEmail}</td>
              <td>₹{booking.totalCost}</td>
              <td>{booking.bookingDates.join(', ')}</td>
              <td>{booking.status}</td>
              <td>
                {booking.status === 'pending' && (
                  <button onClick={() => handleConfirm(booking._id)}>Confirm</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Statusa;
