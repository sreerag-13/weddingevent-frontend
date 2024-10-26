import { FaPlus, FaTrash, FaCalendarCheck } from 'react-icons/fa';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Nav2 from './Nav2';

const Bookc = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { posts = [], catererId } = location.state || {};

  const [pricingDetails, setPricingDetails] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    if (!catererId) return;

    const fetchPricingDetails = async () => {
      try {
        const response = await axios.post('http://localhost:8082/catering-pricing', { userId: catererId });
        setPricingDetails(response.data.data);
      } catch (error) {
        alert('Unable to fetch pricing details. Please try again.');
      }
    };

    fetchPricingDetails();
  }, [catererId]);

  const handleAddToCart = (packageDetail) => setCart((prevCart) => [...prevCart, packageDetail]);
  const handleRemoveFromCart = (index) => setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  const handleDateChange = (date) => setSelectedDate(date);

  const handleBook = async () => {
    if (!selectedDate) {
      alert('Please select a date to book.');
      return;
    }

    const userId = sessionStorage.getItem('userId');
    if (!userId || !catererId) {
      alert('Invalid user or caterer ID.');
      return;
    }

    const bookingItems = cart.map(item => ({
      type: item.foodType,
      price: item.foodPrice,
    }));

    const totalCost = cart.reduce((total, item) => total + item.foodPrice, 0);

    try {
      const response = await axios.post('http://localhost:8082/api/book', {
        userId,
        entityId: catererId,
        entityType: 'catering',
        bookingItems,
        totalCost,
        bookingDates: [selectedDate],
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
        alert('Unable to complete booking. Please try again.');
      }
    }
  };

  if (!posts.length) {
    return (
      <div style={centeredContainer}>
        <h2>No posts found for this caterer.</h2>
        <button onClick={() => navigate(-1)}>
          <i className="bi bi-arrow-left" style={{ marginRight: '5px' }}></i> Go Back
        </button>
      </div>
    );
  }

  return (
    <div>
      <Nav2 />
      <div style={centeredContainer}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Caterer's Posts</h2>
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
                <strong>{pricing.foodType}</strong>: ₹{pricing.foodPrice} - {pricing.Quantity} (Package: {pricing.Package})
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
                  <FaPlus style={{ marginRight: '5px' }} /> Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: '20px' }}>
          <h3><FaCalendarCheck style={{ marginRight: '5px' }} /> Select a Date for Booking:</h3>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            minDate={new Date()}
            dateFormat="MMMM d, yyyy"
          />
        </div>

        {cart.length > 0 && (
          <div style={cartStyle}>
            <h3 style={{ textAlign: 'center' }}><i className="bi bi-cart" style={{ marginRight: '5px' }}></i> Cart Summary</h3>
            <div style={cartItemsStyle}>
              {cart.map((item, index) => (
                <div key={index} style={cartItemStyle}>
                  <span>{item.foodType} - ₹{item.foodPrice}</span>
                  <button onClick={() => handleRemoveFromCart(index)} style={removeButtonStyle}>
                    <FaTrash style={{ marginRight: '5px' }} /> Remove
                  </button>
                </div>
              ))}
            </div>
            <div style={cartFooterStyle}>
              <strong>Total: ₹{cart.reduce((total, item) => total + item.foodPrice, 0)}</strong>
              <button onClick={handleBook} style={bookButtonStyle}>
                <i className="bi bi-book" style={{ marginRight: '5px' }}></i> Book Now
              </button>
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
          <i className="bi bi-arrow-left" style={{ marginRight: '5px' }}></i> Go Back
        </button>
      </div>
    </div>
  );
};

// Centered Container Style
const centeredContainer = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px',
};

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
