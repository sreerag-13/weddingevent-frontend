import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // DatePicker styles

const Bookc = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { posts = [], catererId } = location.state || {}; // Extract catererId

  // Debugging log for location state
  console.log('Location state:', location.state);

  const [pricingDetails, setPricingDetails] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  // Check for catererId before fetching
  useEffect(() => {
    if (!catererId) {
      console.error('Caterer ID is not defined');
      return; // Early return if catererId is undefined
    }

    const fetchPricingDetails = async () => {
      try {
        console.log('Fetching pricing details for catererId:', catererId); // Debug log
        const response = await axios.post('http://localhost:8082/catering-pricing', {
          userId: catererId,
        });

        console.log('Response data:', response.data); // Debug log
        setPricingDetails(response.data.data); // Set pricing details
      } catch (error) {
        console.error('Error fetching pricing details:', error.message);
        alert('Unable to fetch pricing details. Please try again.');
      }
    };

    fetchPricingDetails();
  }, [catererId]);

  const handleAddToCart = (packageDetail) => {
    setCart((prevCart) => [...prevCart, packageDetail]);
  };

  const handleRemoveFromCart = (index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  const handleDateChange = (date) => setSelectedDate(date);

  const handleBook = async () => {
    if (!selectedDate) {
      alert('Please select a date to book.');
      return;
    }

    const userId = sessionStorage.getItem('userId'); // Get userId from sessionStorage
    if (!userId || !catererId) {
      alert('Invalid user or caterer ID.');
      return;
    }

    const bookingItems = cart.map(item => ({
      type: item.foodType, // Ensure foodType exists in the selected item
      price: item.foodPrice, // Ensure foodPrice exists in the selected item
    }));

    const totalCost = cart.reduce((total, item) => total + item.foodPrice, 0); // Calculate total cost
    const bookingDates = [selectedDate];

    try {
      const response = await axios.post('http://localhost:8082/api/book', {
        userId,
        entityId: catererId, // Use catererId instead of auditoriumId
        entityType: 'catering', // Change entityType to catering
        bookingItems,
        totalCost,
        bookingDates,
      });

      if (response.status === 201) {
        alert(response.data.message);
        setCart([]);
        setSelectedDate(null);
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert('This caterer is already booked on the selected date. Please choose a different date.');
      } else {
        console.error('Error during booking:', error);
        alert('Unable to complete booking. Please try again.');
      }
    }
  };

  if (!posts.length) {
    return (
      <div>
        <h2>No posts found for this caterer.</h2>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Caterer's Posts</h2>

      {/* Display Caterer Posts */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {posts.map((post) => (
          <div
            key={post._id}
            style={{
              margin: '15px',
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '10px',
              width: '300px',
            }}
          >
            {post.postImage.map((image, i) => (
              <img
                key={i}
                src={`http://localhost:8082/uploads/${image}`}
                alt="Post by caterer"
                style={{ width: '100%', borderRadius: '5px', marginBottom: '10px' }}
              />
            ))}
            <p>Date: {new Date(post.date).toLocaleDateString()}</p>
          </div>
        ))}
      </div>

      {/* Display Pricing Details */}
      <h3>Pricing Details:</h3>
      {pricingDetails.length === 0 ? (
        <p>No pricing details available for this caterer.</p>
      ) : (
        <div>
          {pricingDetails.map((pricing) => (
            <div
              key={pricing._id}
              style={{
                marginBottom: '15px',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '8px',
              }}
            >
              {/* Display foodType, foodPrice, Quantity, and Package */}
              <strong>{pricing.foodType}</strong>: ₹{pricing.foodPrice} - {pricing.Quantity} (Package: {pricing.Package})
              {/* Display foodItems if available */}
              {pricing.foodItems && pricing.foodItems.length > 0 && (
                <div>
                  <strong>Food Items:</strong>
                  <ul>
                    {pricing.foodItems.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              <button
                onClick={() => handleAddToCart(pricing)}
                style={{
                  marginLeft: '10px',
                  padding: '5px 10px',
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Date Picker */}
      <div style={{ marginTop: '20px' }}>
        <h3>Select a Date for Booking:</h3>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          minDate={new Date()}
          dateFormat="MMMM d, yyyy"
        />
      </div>

      {/* Cart Summary */}
      {cart.length > 0 && (
        <div style={cartStyle}>
          <h3 style={{ textAlign: 'center' }}>Cart Summary</h3>
          <div style={cartItemsStyle}>
            {cart.map((item, index) => (
              <div key={index} style={cartItemStyle}>
                <span>{item.foodType} - ₹{item.foodPrice}</span>
                <button onClick={() => handleRemoveFromCart(index)} style={removeButtonStyle}>
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div style={cartFooterStyle}>
            <strong>Total: ₹{cart.reduce((total, item) => total + item.foodPrice, 0)}</strong>
            <button onClick={handleBook} style={bookButtonStyle}>Book Now</button>
          </div>
        </div>
      )}

      <button
        onClick={() => navigate(-1)}
        style={{
          margin: '20px auto',
          display: 'block',
          padding: '10px 20px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
        }}
      >
        Go Back
      </button>
    </div>
  );
};

// Styles for Cart
const cartStyle = {
  marginTop: '30px',
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '8px',
  backgroundColor: '#f9f9f9',
  width: '400px',
  margin: '30px auto',
};

const cartItemsStyle = { marginBottom: '15px' };
const cartItemStyle = { display: 'flex', justifyContent: 'space-between', marginBottom: '10px', padding: '10px', borderBottom: '1px solid #ddd' };
const removeButtonStyle = { backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' };
const cartFooterStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' };
const bookButtonStyle = { padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' };

export default Bookc;
