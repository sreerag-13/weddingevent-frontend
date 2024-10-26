import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Cardsp.css'; // Styling for the cards
import { useNavigate } from 'react-router-dom';
import Nav2 from './Nav2'; // Import the Nav2 component

const Cardd = () => {
    const [decorators, setDecorators] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // State for search input
    const [filteredDecorators, setFilteredDecorators] = useState([]); // State for filtered decorators
    const navigate = useNavigate();

    // Fetch all decorators
    const fetchDecorators = async () => {
        try {
            const response = await axios.post('http://localhost:8082/viewallD');
            console.log('Decorators fetched:', response.data);
            setDecorators(response.data);
            setFilteredDecorators(response.data); // Initialize filtered decorators
        } catch (error) {
            console.error('Error fetching decorators:', error.message);
            alert('Unable to load decorators. Please try again later.');
        }
    };

    useEffect(() => {
        fetchDecorators(); // Fetch on component mount
    }, []);

    // Function to handle search
    const handleSearch = (event) => {
        const value = event.target.value;
        setSearchTerm(value);

        // Filter decorators based on search term (city or state)
        const filtered = decorators.filter(decorator =>
            decorator.City.toLowerCase().includes(value.toLowerCase()) ||
            decorator.state.toLowerCase().includes(value.toLowerCase())
        );

        setFilteredDecorators(filtered); // Update the state with filtered decorators
    };

    const handleViewPosts = async (decoratorId) => {
        console.log('Fetching posts for decorator ID:', decoratorId);

        try {
            const response = await axios.post('http://localhost:8082/view-my-decoration-posts', {
                userId: decoratorId,
            });

            console.log('Decorator posts response:', response.data);

            if (response.data.posts && response.data.posts.length > 0) {
                navigate('/decoration-posts', { state: { posts: response.data.posts, decoratorId } });
            } else {
                alert('No posts found for this decorator.');
            }
        } catch (error) {
            console.error('Error fetching decorator posts:', error.message);
            alert('Unable to fetch posts. Please try again.');
        }
    };

    return (
        <div className="cardsp-container">
            <Nav2 /> {/* Include the Nav2 navbar */}

            <h2>Registered Decorators</h2>
            
            {/* Search input */}
            <input
                type="text"
                placeholder="Search by city or state"
                value={searchTerm}
                onChange={handleSearch}
                style={{
                    padding: '10px',
                    marginBottom: '20px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    width: '100%',
                    maxWidth: '400px',
                }}
            />

            {filteredDecorators.length === 0 ? (
                <p>No decorators found.</p>
            ) : (
                <div className="cards-wrapper">
                    {filteredDecorators.map((decorator) => (
                        <div className="card" key={decorator._id}>
                            <img
                                src={`http://localhost:8082/uploads/${decorator.dimage}`}
                                alt={decorator.dName}
                                className="card-image"
                            />
                            <h3>{decorator.dName}</h3>
                            <p><strong>City:</strong> {decorator.City}</p>
                            <p><strong>State:</strong> {decorator.state}</p>
                            <p><strong>Experience:</strong> {decorator.experience}</p>
                            <button
                                className="view-button"
                                onClick={() => handleViewPosts(decorator._id)}
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

export default Cardd;
