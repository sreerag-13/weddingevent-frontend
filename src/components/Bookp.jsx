import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // DatePicker styles
import './Bookp.css'; // Import the CSS file
import Nav2 from './Nav2'; // Import the Nav2 component
import { FaPlus, FaTrash, FaCalendarCheck } from 'react-icons/fa'; // Icons for UI

const Bookp = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { posts = [], photographerId } = location.state || {};

    const [pricingDetails, setPricingDetails] = useState([]);
    const [cart, setCart] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        const fetchPricingDetails = async () => {
            const token = sessionStorage.getItem('token'); // Fetch token
            try {
                const response = await axios.post('http://localhost:8082/pricing', {
                    userId: photographerId,
                    token,
                });
                setPricingDetails(response.data.data);
            } catch (error) {
                console.error('Error fetching pricing details:', error.message);
                alert('Unable to fetch pricing details. Please try again.');
            }
        };

        if (photographerId) fetchPricingDetails();
    }, [photographerId]);

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
        if (!userId || !photographerId) {
            alert('Invalid user or photographer ID.');
            return;
        }

        const bookingItems = cart.map(item => ({
            packageName: item.packageName,
            price: item.price,
        }));
        const totalCost = cart.reduce((total, item) => total + item.price, 0);
        const bookingDates = [selectedDate];

        try {
            const response = await axios.post('http://localhost:8082/api/book', {
                userId,
                entityId: photographerId,
                entityType: 'photographer',
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
                <Nav2 /> {/* Include the Nav2 bar */}
                <h2>No posts found for this photographer.</h2>
                <button onClick={() => navigate(-1)}>Go Back</button>
            </div>
        );
    }

    return (
        <div className="bookp-container">
            <Nav2 /> {/* Include the Nav2 bar */}
            <h2 className="title">Photographer's Posts</h2>

            {/* Display Posts */}
            <div className="posts-wrapper">
                {posts.map((post) => (
                    <div key={post._id} className="post-card">
                        {post.postImage.map((image, i) => (
                            <img
                                key={i}
                                src={`http://localhost:8082/uploads/${image}`}
                                alt="Post by photographer"
                                className="post-image"
                            />
                        ))}
                        <p className="post-date">Date: {new Date(post.date).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>

            {/* Pricing Details with Add to Cart */}
            <h3>Pricing Details:</h3>
            {pricingDetails.length === 0 ? (
                <p>No pricing details available.</p>
            ) : (
                <div className="pricing-details">
                    {pricingDetails.map((pricing) => (
                        <div key={pricing._id} className="pricing-card">
                            <strong>{pricing.packageName}</strong>
                            <div className="pricing-info">
                                <span>₹{pricing.price}</span>
                                <span>{pricing.duration}</span>
                                <button
                                    onClick={() => handleAddToCart(pricing)}
                                    className="add-to-cart-button"
                                >
                                    <FaPlus /> Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Date Picker */}
            <div className="date-picker">
               <center><h3><FaCalendarCheck /> Select a Date for Booking:</h3></center> 
                <div className="date-picker-container">
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        minDate={new Date()}
                        dateFormat="MMMM d, yyyy"
                        className="date-input"
                    />
                </div>
            </div>

            {/* Cart Summary */}
            {cart.length > 0 && (
                <div className="cart-summary">
                    <h3>Cart Summary</h3>
                    <div className="cart-items">
                        {cart.map((item, index) => (
                            <div key={index} className="cart-item">
                                <span>{item.packageName} - ₹{item.price}</span>
                                <button onClick={() => handleRemoveFromCart(index)} className="remove-button">
                                    <FaTrash />
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="cart-footer">
                        <strong>Total: ₹{cart.reduce((total, item) => total + item.price, 0)}</strong>
                        <button onClick={handleBook} className="book-button">Book Now</button>
                    </div>
                </div>
            )}

            <button onClick={() => navigate(-1)} className="back-button">
                Go Back
            </button>
        </div>
    );
};

export default Bookp;
