import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Nav2 from './Nav2'; // Import Nav2 component
import './Bookd.css'; // Custom CSS for Bookd
import { FaPlus, FaTrash, FaCalendarCheck } from 'react-icons/fa'; // Icons

const Bookd = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { posts = [], decoratorId } = location.state || {};

    const [pricingDetails, setPricingDetails] = useState([]);
    const [cart, setCart] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);

    // Fetch decoration pricing details
    useEffect(() => {
        const fetchPricingDetails = async () => {
            try {
                const response = await axios.post('http://localhost:8082/decoration-pricing', {
                    userId: decoratorId,
                });
                setPricingDetails(response.data.data);
            } catch (error) {
                console.error('Error fetching pricing details:', error.message);
                alert('Unable to fetch pricing details. Please try again.');
            }
        };

        if (decoratorId) fetchPricingDetails();
    }, [decoratorId]);

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

        const userId = sessionStorage.getItem('userId');
        if (!userId || !decoratorId) {
            alert('Invalid user or decorator ID.');
            return;
        }

        const bookingItems = cart.map(item => ({
            decorationType: item.decorationType,
            DecPrice: item.DecPrice,
        }));
        const totalCost = cart.reduce((total, item) => total + item.DecPrice, 0);
        const bookingDates = [selectedDate];

        try {
            const response = await axios.post('http://localhost:8082/api/book', {
                userId,
                entityId: decoratorId,
                entityType: 'decoration',
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
                alert('This entity is already booked on the selected date. Please choose a different date.');
            } else {
                console.error('Error during booking:', error);
                alert('Unable to complete booking. Please try again.');
            }
        }
    };

    if (!posts.length) {
        return (
            <div>
                <Nav2 /> {/* Include Nav2 here */}
                <h2>No posts found for this decorator.</h2>
                <button onClick={() => navigate(-1)}>Go Back</button>
            </div>
        );
    }

    return (
        <div style={containerStyle}>
            <Nav2 /> {/* Include Nav2 here */}
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Decorator's Posts</h2>

            {/* Display Decorator Posts */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                {posts.map((post) => (
                    <div key={post._id} className="post-card">
                        {post.postImage.map((image, i) => (
                            <img
                                key={i}
                                src={`http://localhost:8082/uploads/${image}`}
                                alt="Post by decorator"
                                className="post-image"
                            />
                        ))}
                        <p>Date: {new Date(post.date).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>

            {/* Display Pricing Details */}
            <h3>Pricing Details:</h3>
            {pricingDetails.length === 0 ? (
                <p>No pricing details available for this decorator.</p>
            ) : (
                <div>
                    {pricingDetails.map((pricing) => (
                        <div key={pricing._id} className="pricing-card">
                            <strong>{pricing.decorationType}</strong>: ₹{pricing.DecPrice} - {pricing.Duration}
                            <button
                                onClick={() => handleAddToCart(pricing)}
                                className="add-to-cart-button"
                            >
                                <FaPlus /> Add to Cart
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Date Picker */}
            <div style={{ marginTop: '20px' }}>
                <h3><FaCalendarCheck /> Select a Date for Booking:</h3>
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
                                <span>{item.decorationType} - ₹{item.DecPrice}</span>
                                <button onClick={() => handleRemoveFromCart(index)} style={removeButtonStyle}>
                                    <FaTrash />
                                </button>
                            </div>
                        ))}
                    </div>
                    <div style={cartFooterStyle}>
                        <strong>Total: ₹{cart.reduce((total, item) => total + item.DecPrice, 0)}</strong>
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

// Container Styles
const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '60%',
    margin: '0 auto',
    padding: '20px',
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

export default Bookd;
