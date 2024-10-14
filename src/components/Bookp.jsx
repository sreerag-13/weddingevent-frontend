import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Bookp = () => {
  const { userId } = useParams();
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const response = await axios.post('http://localhost:8082/view-my-posts', {
          token,
          userId,
        });
        setPosts(response.data.posts);
        setMessage(response.data.message);
      } catch (error) {
        console.error('Error fetching user posts:', error.message);
        setMessage('Error fetching user posts.');
      }
    };

    fetchUserPosts();
  }, [userId]);

  return (
    <div>
      <h2>User Posts</h2>
      {message && <p>{message}</p>}
      {posts.length === 0 ? (
        <p>No posts found for this user.</p>
      ) : (
        <div>
          {posts.map((post) => (
            <div key={post._id}>
              {post.postImage.map((image, i) => (
                <img 
                  key={i} 
                  src={`http://localhost:8082/uploads/${image}`} // Use backticks
                  alt={`Post by user ${userId}`}
                />
              ))}
              {/* Add more post details here */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookp;