import React, { useState } from 'react';
import './createpost.css';
import { ImagesOutline, CloseOutline } from 'react-ionicons';
import axios from 'axios';

const CreatePost = ({ trigger, onClose }) => {
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const currentUserId = sessionStorage.getItem('userID');
  // const currentUserId = '660970232846199a041ae117'; 

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleTagsChange = (event) => {
    const value = event.target.value;
    const tagsArray = value.split(',').map(tag => tag.trim());
    setTags(tagsArray);
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
  
    if (!file) {
      console.error("Please select a file to upload");
      return;
    }
    const fileName = Date.now() + file.name;
   
    const formData = new FormData();
    formData.append("name", fileName);
    formData.append("file", file); 
    
    try {
      // Use the full URL as you used in Postman
      const response = await axios.post("http://localhost:8800/upload/images", formData, {
        headers: {
        }
      });
  
      console.log('File uploaded successfully', response.data);
        
        const imageUrl = `https://5713-42-3-28-129.ngrok-free.app/images/${fileName}`;//need change
        //const imageUrl = `http://localhost:8800/images/${fileName}`;
        console.log('Image URL:', imageUrl);
        console.log('Image URL:', file);
        setImage(imageUrl); 
      

    } catch (error) {
      console.error("Error occurred during file upload", error);
    }
  };

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    setVideo(file)



    
  };

  const handleSubmit = async (event) => {
    console.log("creating posts");
    event.preventDefault();
  
    try {
      const response = await fetch('http://localhost:8800/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: currentUserId,
          desc: content,
          tags: tags,
          img: image
        })
      });
  
      // Handle the response as needed
      const data = await response.json();
      console.log(data);
  
      // Reset the form or close the popup after submission
      onClose();
      window.location.reload();
    } catch (error) {
      // Handle error cases
      console.error(error);
    }
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
            <textarea
              className="tag"
              value={tags}
              onChange={handleTagsChange}
              placeholder="Enter your tags..."
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