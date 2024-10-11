import React, { useState } from 'react';
import axios from 'axios';
import NavP from './NavP'; // Import your navigation component

const Createp = () => {
  const [selectedFiles, setSelectedFiles] = useState([]); // To store selected images
  const [message, setMessage] = useState(""); // To store success or error message
  const [previewImages, setPreviewImages] = useState([]); // To store image previews

  // Handle file input change with validation and preview
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    // Check if the total number of selected files exceeds the limit
    if (files.length + selectedFiles.length > 4) {
      setMessage("You can upload a maximum of 4 images.");
      return;
    }

    // Validate that all selected files are images
    const validFiles = files.filter(file => file.type.startsWith('image/'));
    if (validFiles.length !== files.length) {
      setMessage("Please select only image files.");
      return;
    }

    // Append new files to the existing selected files
    setSelectedFiles(prevFiles => [...prevFiles, ...validFiles]);

    // Generate previews for the newly selected files and append them to the existing previews
    const newPreviewUrls = validFiles.map(file => URL.createObjectURL(file));
    setPreviewImages(prevPreviews => [...prevPreviews, ...newPreviewUrls]);

    setMessage(""); // Clear any error messages
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    const formData = new FormData(); // Create a new FormData object

    // Append the token and userId from sessionStorage
    formData.append("token", sessionStorage.getItem('token'));
    formData.append("userId", sessionStorage.getItem('userId')); 

    // Append each selected file to the form data
    selectedFiles.forEach(file => {
      formData.append("postImage", file);
    });

    // Try to upload the images
    try {
      const response = await axios.post("http://localhost:8082/create-post", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      setMessage("Post created successfully!"); // Success message
      console.log("Server response:", response.data); // Log success response for debugging
    } catch (error) {
      console.error("Error uploading images:", error); // Log error response for debugging
      setMessage("Error uploading images."); // Error message
    }
  };

  return (
    <div>
      {/* Include the NavP navigation component */}
      <NavP />

      <div className="container">
        <h2>Create a New Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="postImage">Upload Images (Max 4)</label>
            <input 
              type="file" 
              id="postImage" 
              multiple 
              className="form-control" 
              onChange={handleFileChange} // Handle file selection
              accept="image/*" // Accept only image files
            />
          </div>

          {/* Preview selected images */}
          <div className="preview-images mt-3">
            {previewImages.length > 0 && (
              <div>
                <h4>Image Preview</h4>
                <div className="d-flex flex-wrap">
                  {previewImages.map((img, index) => (
                    <div key={index} className="p-2">
                      <img 
                        src={img} 
                        alt={`Preview ${index}`} 
                        style={{ width: '150px', height: '150px', objectFit: 'cover' }} 
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Submit button */}
          <button type="submit" className="btn btn-primary mt-3">Upload</button>
        </form>

        {/* Display success or error message */}
        {message && <p className="mt-3">{message}</p>}
      </div>
    </div>
  );
};

export default Createp;
