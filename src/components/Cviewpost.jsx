import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navcat from './Navcat'; // Import the Navcat component
import './Viewpostp.css'; // Import custom styles if needed, or create a new CSS file

const Cviewpost = () => {
  const [cateringPosts, setCateringPosts] = useState([]); // State to store catering posts
  const [message, setMessage] = useState(''); // State to store messages

  useEffect(() => {
    const fetchCateringPosts = async () => {
      try {
        const userId = sessionStorage.getItem('userId'); // Get the user's ID from sessionStorage

        // Make a POST request with the user's ID in the request body
        const response = await axios.post('http://localhost:8082/view-my-catering-posts', { userId });

        // Set the posts and message in state
        setCateringPosts(response.data.posts);
        setMessage(response.data.message);
      } catch (error) {
        console.error('Error fetching catering posts:', error);
        setMessage('Error fetching catering posts.'); // Handle errors
      }
    };

    // Call the function to fetch posts when the component is mounted
    fetchCateringPosts();
  }, []);

  return (
    <div>
      <Navcat /> {/* Add the Navcat component */}
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', marginLeft: '65%', transform: 'translateX(-60%)' }}>
        <h2>My Catering Posts</h2>
        {message && <p>{message}</p>} {/* Display a message if any */}

        {cateringPosts.length > 0 ? (
          <div className="grid-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
            {cateringPosts.map((post, index) => (
              <div key={index} className="grid-item" style={{ border: '1px solid #ddd', borderRadius: '5px', padding: '10px', backgroundColor: '#fff', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }}>
                <h3>Catering Post {index + 1}</h3>
                <div className="image-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                  {post.postImage.map((image, i) => (
                    <img 
                      key={i} 
                      src={`http://localhost:8082/uploads/${image}`} 
                      alt={`Catering Post ${index} Image ${i}`} 
                      style={{ width: '100%', height: 'auto', borderRadius: '5px', margin: '5px' }} 
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No catering posts to display</p> // Show this if no posts are available
        )}
      </div>
    </div>
  );
};

export default Cviewpost;
