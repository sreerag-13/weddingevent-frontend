import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import styles for the date picker

const Bookp = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { posts = [], photographerId } = location.state || {};
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pricingDetails, setPricingDetails] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [availableSlots, setAvailableSlots] = useState([]); // Available slots
    const [bookedSlots, setBookedSlots] = useState([]); // Booked slots

    useEffect(() => {
        // Fetch pricing details for the specified photographer
        const fetchPricingDetails = async () => {
            const token = sessionStorage.getItem('token'); // Get token from sessionStorage
            try {
                const response = await axios.post('http://localhost:8082/pricing', {
                    userId: photographerId,
                    token, // Pass the token if needed
                });
                setPricingDetails(response.data.data); // Assuming response structure is { data: pricingDetails }
            } catch (error) {
                console.error('Error fetching pricing details:', error.message);
                alert('Unable to fetch pricing details. Please try again.');
            }
        };

        if (photographerId) {
            fetchPricingDetails();
        }
    }, [photographerId]);

    // Fetch booked slots for a selected date
    const fetchBookedSlots = async (date) => {
        try {
            const response = await axios.post('http://localhost:8082/bookedSlots', {
                userId: photographerId,
                date: date.toISOString().split('T')[0], // Send date in YYYY-MM-DD format
            });
            setBookedSlots(response.data.bookedSlots); // Assuming response structure
        } catch (error) {
            console.error('Error fetching booked slots:', error.message);
        }
    };

    // Function to handle date selection
    const handleDateChange = (date) => {
        setSelectedDate(date);
        fetchBookedSlots(date); // Fetch booked slots for the selected date
    };

    // Function to open the image in modal
    const openImageModal = (post, index) => {
        setSelectedImage(post.postImage);
        setCurrentImageIndex(index); // Set current index to the clicked image
        setIsModalOpen(true);
    };

    // Function to close the image modal
    const closeImageModal = () => {
        setIsModalOpen(false);
    };

    // Function to handle slideshow navigation
    const handleNextImage = () => {
        setCurrentImageIndex((currentImageIndex + 1) % selectedImage.length); // Move to next image
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((currentImageIndex - 1 + selectedImage.length) % selectedImage.length); // Move to previous image
    };

    // Function to handle booking a package
    const handleBookPackage = (packageName) => {
        if (!selectedDate) {
            alert('Please select a date to book.');
            return;
        }

        // Implement logic for displaying available slots
        alert(`Booking package: ${packageName} on ${selectedDate.toLocaleDateString()}`);
    };

    const handleConfirmBooking = (slot) => {
        alert(`Confirmed booking for slot: ${slot} on ${selectedDate.toLocaleDateString()}`);
        setBookedSlots([...bookedSlots, slot]); // Update booked slots
    };

    if (!posts.length) {
        return (
            <div>
                <h2>No posts found for this photographer.</h2>
                <button onClick={() => navigate(-1)}>Go Back</button>
            </div>
        );
    }

    return (
        <div style={{ padding: '20px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Photographer's Posts</h2>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {posts.map((post) => (
                    <div key={post._id} style={{ margin: '15px', border: '1px solid #ccc', borderRadius: '8px', padding: '10px', textAlign: 'center', width: '300px' }}>
                        {post.postImage.map((image, i) => (
                            <div key={i} style={{ marginBottom: '10px' }}>
                                <img
                                    src={`http://localhost:8082/uploads/${image}`}
                                    alt="Post by photographer"
                                    style={{ width: '100%', borderRadius: '5px', cursor: 'pointer' }}
                                    onClick={() => openImageModal(post, i)} // Pass post and index to open modal
                                />
                            </div>
                        ))}
                        <p style={{ fontSize: '14px', color: '#666' }}>Date: {new Date(post.date).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>

            <div>
                <h3>Pricing Details:</h3>
                {pricingDetails.length === 0 ? (
                    <p>No pricing details available.</p>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        {pricingDetails.map(pricing => (
                            <div key={pricing._id} style={{ margin: '10px 0', border: '1px solid #ccc', borderRadius: '5px', padding: '10px', width: '100%' }}>
                                <strong>{pricing.packageName}</strong>: ₹{pricing.price} - {pricing.duration}
                                <button
                                    onClick={() => handleBookPackage(pricing.packageName)}
                                    style={{ marginLeft: '10px', padding: '5px 10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                                >
                                    Book
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Date Picker for Slot Booking */}
            <div style={{ marginTop: '20px' }}>
                <h3>Select a Date for Booking:</h3>
                <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    minDate={new Date()}
                    dateFormat="MMMM d, yyyy"
                />
            </div>

            {selectedDate && (
                <div style={{ marginTop: '20px' }}>
                    <h3>Available Slots:</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {[...Array(8).keys()].map(slot => {
                            const slotTime = `${slot + 9}:00`; // Example slots from 9 AM to 4 PM
                            const isBooked = bookedSlots.includes(slotTime);

                            return (
                                <div
                                    key={slot}
                                    style={{
                                        margin: '5px',
                                        padding: '10px',
                                        border: '1px solid #ccc',
                                        borderRadius: '5px',
                                        backgroundColor: isBooked ? 'red' : 'green',
                                        color: 'white',
                                        cursor: isBooked ? 'not-allowed' : 'pointer'
                                    }}
                                    onClick={() => !isBooked && handleConfirmBooking(slotTime)}
                                >
                                    {slotTime} {isBooked ? '(Booked)' : '(Available)'}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {isModalOpen && selectedImage && (
                <div style={modalStyle}>
                    <div style={overlayStyle} onClick={closeImageModal}></div>
                    <div style={modalContentStyle}>
                        <button onClick={handlePrevImage} style={navButtonStyle}>&lt;</button>
                        <img
                            src={`http://localhost:8082/uploads/${selectedImage[currentImageIndex]}`}
                            alt="Selected"
                            style={{ width: '500px', borderRadius: '5px' }}
                        />
                        <button onClick={handleNextImage} style={navButtonStyle}>&gt;</button>
                        <button onClick={closeImageModal} style={closeButtonStyle}>Close</button>
                    </div>
                </div>
            )}
            <button onClick={() => navigate(-1)} style={{ margin: '10px auto', display: 'block' }}>Go Back</button>
        </div>
    );
};

// Modal Styles
const modalStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
};

const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
};

const modalContentStyle = {
    position: 'relative',
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '8px',
    zIndex: 1001,
};

const navButtonStyle = {
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
};

const closeButtonStyle = {
    display: 'block',
    margin: '10px auto',
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
};

export default Bookp;
