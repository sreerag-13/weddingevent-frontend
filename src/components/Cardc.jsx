import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Cardsp.css'; // Styling for the cards
import { useNavigate } from 'react-router-dom';
import Nav2 from './Nav2'; // Import the Nav2 component

const Cardc = () => {
    const [caterers, setCaterers] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // State for search input
    const [filteredCaterers, setFilteredCaterers] = useState([]); // State for filtered caterers
    const navigate = useNavigate();

    // Fetch all caterers
    const fetchCaterers = async () => {
        try {
            const response = await axios.post('http://localhost:8082/viewallC');
            console.log('Caterers fetched:', response.data);
            setCaterers(response.data);
            setFilteredCaterers(response.data); // Initialize filtered caterers
        } catch (error) {
            console.error('Error fetching caterers:', error.message);
            alert('Unable to load caterers. Please try again later.');
        }
    };

    useEffect(() => {
        fetchCaterers(); // Fetch on component mount
    }, []);

    // Function to handle search
    const handleSearch = (event) => {
        const value = event.target.value;
        setSearchTerm(value);

        // Filter caterers based on search term (CName or City)
        const filtered = caterers.filter(caterer =>
            caterer.CName.toLowerCase().includes(value.toLowerCase()) ||
            caterer.City.toLowerCase().includes(value.toLowerCase())
        );

        setFilteredCaterers(filtered); // Update the state with filtered caterers
    };

    const handleViewPosts = async (catererId) => {
        console.log('Fetching posts for caterer ID:', catererId);

        try {
            const response = await axios.post('http://localhost:8082/view-my-catering-posts', {
                userId: catererId,
            });

            console.log('Catering posts response:', response.data);

            if (response.data.posts && response.data.posts.length > 0) {
                navigate('/catering-posts', { state: { posts: response.data.posts, catererId } });
            } else {
                alert('No posts found for this caterer.');
            }
        } catch (error) {
            console.error('Error fetching catering posts:', error.message);
            alert('Unable to fetch posts. Please try again.');
        }
    };

    return (
        <div className="cardsp-container">
            <Nav2 /> {/* Include the Nav2 navbar */}

            <h2>Registered Caterers</h2>
            
            {/* Search input */}
            <input
                type="text"
                placeholder="Search by name or city"
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

            {filteredCaterers.length === 0 ? (
                <p>No caterers found.</p>
            ) : (
                <div className="cards-wrapper">
                    {filteredCaterers.map((caterer) => (
                        <div className="card" key={caterer._id}>
                            <img
                                src={`http://localhost:8082/uploads/${caterer.Cimage}`}
                                alt={caterer.CName}
                                className="card-image"
                            />
                            <h3>{caterer.CName}</h3>
                            <p><strong>Email:</strong> {caterer.Email}</p>
                            <p><strong>Phone:</strong> {caterer.Phone}</p>
                            <p><strong>City:</strong> {caterer.City}</p>
                            <p><strong>State:</strong> {caterer.state}</p>
                            <p><strong>Experience:</strong> {caterer.experience}</p>
                            <button
                                className="view-button"
                                onClick={() => handleViewPosts(caterer._id)}
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

export default Cardc;
