import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navd from './Navd'; // Import the Navd component

const Viewpostd = () => {
  const [decorationPosts, setDecorationPosts] = useState([]); // State to store decoration posts
  const [message, setMessage] = useState(''); // State to store messages

  useEffect(() => {
    const fetchDecorationPosts = async () => {
      try {
        const userId = sessionStorage.getItem('userId'); // Get the user's ID from sessionStorage
        
        // Make a POST request with the user's ID in the request body
        const response = await axios.post('http://localhost:8082/view-my-decoration-posts', { userId });
        
        // Set the posts and message in state
        setDecorationPosts(response.data.posts);
        setMessage(response.data.message);
      } catch (error) {
        console.error('Error fetching decoration posts:', error);
        setMessage('Error fetching decoration posts.'); // Handle errors
      }
    };

    // Call the function to fetch posts when the component is mounted
    fetchDecorationPosts();
  }, []);

  return (
    <div>
      <Navd /> {/* Include the Navd navigation component */}

      <h2>My Decoration Posts</h2>
      {message && <p>{message}</p>} {/* Display a message if any */}
      
      {decorationPosts.length > 0 ? (
        <div>
          {decorationPosts.map((post, index) => (
            <div key={index}>
              <h3>Decoration Post {index + 1}</h3>
              {post.postImage.map((image, i) => (
                <img 
                  key={i} 
                  src={`http://localhost:8082/uploads/${image}`} 
                  alt={`Decoration Post ${index} Image ${i}`} 
                  width="200" 
                />
              ))}
            </div>
          ))}
        </div>
      ) : (
        <p>No decoration posts to display</p> // Show this if no posts are available
      )}
    </div>
  );
};

export default Viewpostd;
