import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavP from './NavP'; // Import the NavP component
import './Viewpostp.css'; // Import custom styles for this component

const Viewpostp = () => {
  const [posts, setPosts] = useState([]); // State to store posts
  const [message, setMessage] = useState(''); // State to store messages

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = sessionStorage.getItem('token'); // Get the token from sessionStorage
        const userId = sessionStorage.getItem('userId'); // Get the user's ID from sessionStorage
        
        // Make a POST request with the token and user's ID in the request body
        const response = await axios.post('http://localhost:8082/view-my-posts', { token, userId });
        
        // Set the posts and message in state
        setPosts(response.data.posts); 
        setMessage(response.data.message);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setMessage('Error fetching posts.'); // Handle errors
      }
    };

    // Call the function to fetch posts when the component is mounted
    fetchPosts();
  }, []);

  return (
    <div>
      <NavP /> {/* Add the NavP component */}
      <div className="container mt-4">
        <h2>My Posts</h2>
        {message && <p>{message}</p>} {/* Display a message if any */}
        
        {posts.length > 0 ? (
          <div className="grid-container">
            {posts.map((post, index) => (
              <div key={index} className="grid-item">
                <h3>Post {index + 1}</h3>
                <div className="image-container">
                  {post.postImage.map((image, i) => (
                    <img 
                      key={i} 
                      src={`http://localhost:8082/uploads/${image}`} 
                      alt={`Post ${index} Image ${i}`} 
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No posts to display</p> // Show this if no posts are available
        )}
      </div>
    </div>
  );
};

export default Viewpostp;
