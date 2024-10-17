import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Cardsp.css';
import { useNavigate } from 'react-router-dom';

const Cardsp = () => {
    const [photographers, setPhotographers] = useState([]);
    const navigate = useNavigate();

    // Fetch all photographers
    const fetchPhotographers = async () => {
        try {
            const response = await axios.post('http://localhost:8082/viewallp');
            console.log('Photographers fetched:', response.data);
            setPhotographers(response.data);
        } catch (error) {
            console.error('Error fetching photographers:', error.message);
            alert('Unable to load photographers. Please try again later.');
        }
    };

    useEffect(() => {
        fetchPhotographers();
    }, []);

    const handleViewPosts = async (photographerId) => {
        const token = sessionStorage.getItem('token'); // Get token from sessionStorage

        console.log('Fetching posts for photographer ID:', photographerId); // Log photographer ID
        console.log('Using token:', token); // Log token

        try {
            const response = await axios.post('http://localhost:8082/view-photographer-posts', {
                token,
                photographerId,
            });

            console.log('Photographer posts response:', response.data); // Log response data

            if (response.data.posts && response.data.posts.length > 0) {
                navigate('/user-posts', { state: { posts: response.data.posts, photographerId } });
            } else {
                alert('No posts found for this photographer.');
            }
        } catch (error) {
            console.error('Error fetching photographer posts:', error.message); // Log error message
            alert('Unable to fetch posts. Please try again.');
        }
    };

    return (
        <div className="cardsp-container">
            <h2>Registered Photographers</h2>
            {photographers.length === 0 ? (
                <p>No photographers found.</p>
            ) : (
                <div className="cards-wrapper">
                    {photographers.map((photographer) => (
                        <div className="card" key={photographer._id}>
                            <img
                                src={`http://localhost:8082/images/${photographer.Pimage}`}
                                alt={photographer.PName}
                                className="card-image"
                            />
                            <h3>{photographer.PName}</h3>
                            <p><strong>City:</strong> {photographer.City}</p>
                            <p><strong>State:</strong> {photographer.state}</p>
                            <p><strong>Experience:</strong> {photographer.experience}</p>
                            <button
                                className="view-button"
                                onClick={() => handleViewPosts(photographer._id)}
                            >
                                View Posts
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Cardsp;
