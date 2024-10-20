import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
      <h2>My Auditorium Posts</h2>
      {message && <p>{message}</p>} {/* Display a message if any */}
      
      {auditoriumPosts.length > 0 ? (
        <div>
          {auditoriumPosts.map((post, index) => (
            <div key={index}>
              <h3>Auditorium Post {index + 1}</h3>
              {post.postImage.map((image, i) => (
                <img 
                  key={i} 
                  src={`http://localhost:8082/uploads/${image}`} 
                  alt={`Auditorium Post ${index} Image ${i}`} 
                  width="200" 
                />
              ))}
            </div>
          ))}
        </div>
      ) : (
        <p>No auditorium posts to display</p> // Show this if no posts are available
      )}
    </div>
  );
};

export default Aviewp;
