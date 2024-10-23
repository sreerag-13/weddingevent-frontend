import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Adbook = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch confirmed bookings on component mount
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:8082/confirmed-bookings');
        setBookings(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch bookings.');
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const sendEmail = async (userEmail) => {
    try {
      const response = await axios.post('http://localhost:8082/send-email', {
        email: userEmail,
        subject: 'Booking Confirmation',
        body: 'Thank you for your booking!',
      });
      alert(`Email sent to ${userEmail}`);
    } catch (err) {
      alert('Failed to send email.');
      console.error(err);
    }
  };

  if (loading) {
    return <div>Loading confirmed bookings...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Confirmed Bookings</h1>
      {bookings.length === 0 ? (
        <p className="text-center">No confirmed bookings available.</p>
      ) : (
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>User Name</th>
              <th>User Email</th>
              <th>Entity Type</th>
              <th>Entity Name</th>
              <th>Total Cost</th>
              <th>Booking Dates</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.userId?.UName || 'Unknown User'}</td>
                <td>{booking.userId?.Email || 'Unknown Email'}</td>
                <td>{booking.entityType}</td>
                <td>{booking.entityName}</td>
                <td>₹{booking.totalCost}</td>
                <td>
                  {booking.bookingDates.map((date, index) => (
                    <div key={index}>{new Date(date).toLocaleDateString()}</div>
                  ))}
                </td>
                <td>{booking.status}</td>
                <td>{new Date(booking.createdAt).toLocaleString()}</td>
                <td>
                  <button 
                    className="btn btn-primary" 
                    onClick={() => sendEmail(booking.userId?.Email)}
                  >
                    Send Email
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Adbook;
