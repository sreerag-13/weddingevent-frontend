import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Nav3 from './Nav3'; // Import the Nav3 component
import './Aviewp.css'; // Import a separate CSS file for styles

const Aviewp = () => {
  const [auditoriumPosts, setAuditoriumPosts] = useState([]); // State to store auditorium posts
  const [message, setMessage] = useState(''); // State to store messages

  useEffect(() => {
    const fetchAuditoriumPosts = async () => {
      try {
        const userId = sessionStorage.getItem('userId'); // Get the user's ID from sessionStorage
        
        // Make a POST request with the user's ID in the request body
        const response = await axios.post('http://localhost:8082/view-my-auditorium-posts', { userId });
        
        // Set the posts and message in state
        setAuditoriumPosts(response.data.posts);
        setMessage(response.data.message);
      } catch (error) {
        console.error('Error fetching auditorium posts:', error);
        setMessage('Error fetching auditorium posts.'); // Handle errors
      }
    };

    // Call the function to fetch posts when the component is mounted
    fetchAuditoriumPosts();
  }, []);

  return (
    <div>
      <Nav3 /> {/* Include the Nav3 navigation component */}
      
      <div className="container">
        <h2>My Auditorium Posts</h2>
        {message && <p>{message}</p>} {/* Display a message if any */}
        
        {auditoriumPosts.length > 0 ? (
          <div className="grid-container">
            {auditoriumPosts.map((post, index) => (
              <div className="grid-item" key={index}>
                <h3>Auditorium Post {index + 1}</h3>
                <div className="image-container">
                  {post.postImage.map((image, i) => (
                    <img 
                      key={i} 
                      src={`http://localhost:8082/uploads/${image}`} 
                      alt={`Auditorium Post ${index} Image ${i}`} 
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No auditorium posts to display</p> // Show this if no posts are available
        )}
      </div>
    </div>
  );
};

export default Aviewp;
