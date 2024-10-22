import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
      <h2>My Catering Posts</h2>
      {message && <p>{message}</p>} {/* Display a message if any */}
      
      {cateringPosts.length > 0 ? (
        <div>
          {cateringPosts.map((post, index) => (
            <div key={index}>
              <h3>Catering Post {index + 1}</h3>
              {post.postImage.map((image, i) => (
                <img 
                  key={i} 
                  src={`http://localhost:8082/uploads/${image}`} 
                  alt={`Catering Post ${index} Image ${i}`} 
                  width="200" 
                />
              ))}
            </div>
          ))}
        </div>
      ) : (
        <p>No catering posts to display</p> // Show this if no posts are available
      )}
    </div>
  );
};

export default Cviewpost;
