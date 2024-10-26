import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavP from './NavP'; // Import the NavP component

const Statusp = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      const photographerId = sessionStorage.getItem('userId');
      if (!photographerId) {
        setError('User ID not found. Please log in again.');
        return;
      }

      try {
        const response = await axios.post('http://localhost:8082/api/bookings/fetch', {
          photographerId,
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

  const styles = {
    container: {
      maxWidth: '1200px', /* Set a max width for the container */
      margin: '0 auto', /* Center the container */
      padding: '20px', /* Add padding around the container */
      marginLeft: '40%', /* Move the entire page to the right by 40% */
      transform: 'translateX(-40%)', /* Adjust to keep content centered in its area */
    },
    errorMessage: {
      color: 'red', /* Style for error messages */
      fontWeight: 'bold',
    },
    bookingsTable: {
      width: '100%',
      borderCollapse: 'collapse', /* Remove space between table borders */
      marginTop: '20px', /* Space above the table */
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', /* Add shadow to the table */
    },
    tableHeader: {
      backgroundColor: '#007BFF', /* Blue background for header */
      color: '#fff', /* White text color */
      fontWeight: 'bold', /* Bold text for header */
    },
    tableCell: {
      border: '1px solid #ddd', /* Table border */
      padding: '12px', /* Padding inside cells */
      textAlign: 'left', /* Align text to the left */
    },
    zebraStripe: {
      backgroundColor: '#f9f9f9', /* Zebra striping for even rows */
    },
    tableRowHover: {
      backgroundColor: '#f1f1f1', /* Light grey background on hover */
    },
    confirmButton: {
      backgroundColor: '#28a745', /* Green background */
      color: 'white', /* White text */
      border: 'none', /* No border */
      padding: '8px 12px', /* Padding for button */
      borderRadius: '5px', /* Rounded corners */
      cursor: 'pointer', /* Pointer cursor on hover */
      transition: 'background-color 0.3s, transform 0.2s', /* Transition for hover effect */
      fontWeight: 'bold', /* Bold text for button */
      fontSize: '14px', /* Font size */
    },
    confirmButtonHover: {
      backgroundColor: '#218838', /* Darker green on hover */
      transform: 'scale(1.05)', /* Slightly enlarge on hover */
    },
    confirmButtonActive: {
      transform: 'scale(0.95)', /* Slightly shrink on click */
    },
  };

  return (
    <div>
      <NavP /> {/* Add the NavP component */}
      <div style={styles.container}>
        <h2>Bookings</h2>
        {error && <p style={styles.errorMessage}>{error}</p>}
        <table style={styles.bookingsTable}>
          <thead>
            <tr>
              <th style={{ ...styles.tableCell, ...styles.tableHeader }}>User Name</th>
              <th style={{ ...styles.tableCell, ...styles.tableHeader }}>User Email</th>
              <th style={{ ...styles.tableCell, ...styles.tableHeader }}>Total Cost</th>
              <th style={{ ...styles.tableCell, ...styles.tableHeader }}>Booking Dates</th>
              <th style={{ ...styles.tableCell, ...styles.tableHeader }}>Status</th>
              <th style={{ ...styles.tableCell, ...styles.tableHeader }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={booking._id} style={index % 2 === 0 ? styles.zebraStripe : {}}>
                <td style={styles.tableCell}>{booking.userName}</td>
                <td style={styles.tableCell}>{booking.userEmail}</td>
                <td style={styles.tableCell}>₹{booking.totalCost}</td>
                <td style={styles.tableCell}>{booking.bookingDates.join(', ')}</td>
                <td style={styles.tableCell}>{booking.status}</td>
                <td style={styles.tableCell}>
                  {booking.status === 'pending' && (
                    <button
                      style={styles.confirmButton}
                      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.confirmButtonHover.backgroundColor)}
                      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = styles.confirmButton.backgroundColor)}
                      onMouseDown={(e) => (e.currentTarget.style.transform = styles.confirmButtonActive.transform)}
                      onMouseUp={(e) => (e.currentTarget.style.transform = '')}
                      onClick={() => handleConfirm(booking._id)}
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

export default Statusp;
