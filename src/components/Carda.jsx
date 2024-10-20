import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Cardsp.css'; // Styling for the cards
import { useNavigate } from 'react-router-dom';

const Carda = () => {
    const [auditoriums, setAuditoriums] = useState([]);
    const navigate = useNavigate();

    // Fetch all auditoriums
    const fetchAuditoriums = async () => {
        try {
            const response = await axios.post('http://localhost:8082/viewallA');
            console.log('Auditoriums fetched:', response.data);
            setAuditoriums(response.data);
        } catch (error) {
            console.error('Error fetching auditoriums:', error.message);
            alert('Unable to load auditoriums. Please try again later.');
        }
    };

    useEffect(() => {
        fetchAuditoriums(); // Fetch on component mount
    }, []);

    const handleViewPosts = async (auditoriumId) => {
        console.log('Fetching posts for auditorium ID:', auditoriumId);

        try {
            const response = await axios.post('http://localhost:8082/view-my-auditorium-posts', {
                userId: auditoriumId,
            });

            console.log('Auditorium posts response:', response.data);

            if (response.data.posts && response.data.posts.length > 0) {
                navigate('/auditorium-posts', { state: { posts: response.data.posts, auditoriumId } });
            } else {
                alert('No posts found for this auditorium.');
            }
        } catch (error) {
            console.error('Error fetching auditorium posts:', error.message);
            alert('Unable to fetch posts. Please try again.');
        }
    };

    return (
        <div className="cardsp-container">
            <h2>Registered Auditoriums</h2>
            {auditoriums.length === 0 ? (
                <p>No auditoriums found.</p>
            ) : (
                <div className="cards-wrapper">
                    {auditoriums.map((auditorium) => (
                        <div className="card" key={auditorium._id}>
                            <img
                                src={`http://localhost:8082/uploads/${auditorium.aimage}`}
                                alt={auditorium.aName}
                                className="card-image"
                            />
                            <h3>{auditorium.aName}</h3>
                            <p><strong>City:</strong> {auditorium.City}</p>
                            <p><strong>State:</strong> {auditorium.state}</p>
                            <p><strong>Experience:</strong> {auditorium.experience}</p>
                            <button
                                className="view-button"
                                onClick={() => handleViewPosts(auditorium._id)}
        
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

export default Carda;
