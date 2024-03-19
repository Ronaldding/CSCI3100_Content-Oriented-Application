import React, { useState } from 'react';
import './createpost.css';
import { ImagesOutline, CloseOutline } from 'react-ionicons'

const CreatePost = ({ trigger, onClose }) => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    setVideo(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the submission logic here
    // You can access the content, image, and video state variables
    // and perform the necessary actions (e.g., send data to the server)
    // Reset the form or close the popup after submission
    onClose();
  };

  return (
    trigger && (
      <div className="createPostOverlay">
        <div className="createPostPopup">
          <form onSubmit={handleSubmit}>
            <button className="closeButton" onClick={onClose}>
                <CloseOutline color="#ffffff" height="20px" width="20px" />
            </button>
            <textarea
              value={content}
              onChange={handleContentChange}
              placeholder="Enter your content..."
            />
            <label className="uploadLabel">
              <ImagesOutline color="#ffffff" height="20px" width="20px" />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
            </label>
            <button className="postbtn" type="submit">Post</button>
          </form>
        </div>
      </div>
    )
  );
};

export default CreatePost;