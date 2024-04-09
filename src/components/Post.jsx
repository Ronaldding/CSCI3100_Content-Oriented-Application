import React, { useState, useEffect } from 'react';
import './post.css';
import { EllipsisVertical, HeartOutline, ChatbubbleOutline, PaperPlaneOutline, Heart } from 'react-ionicons';
import axios from 'axios';

const Post = ({ post }) => {
  const currentUserId = '660970232846199a041ae117'; // Replace with the current user's ID
  const [currentUserLiked, setCurrentUserLiked] = useState(post.likes.includes(currentUserId));
  const [numLike, setNumLike] = useState(post.likes.length);

  const handleLike = async () => {
    try {
      const url = `http://localhost:8800/post/${post._id}/like`;
  
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: currentUserId
        })
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log(data); // Log the response if needed
      } else {
        console.error(data); // Log the error response if needed
      }
  
      if (currentUserLiked) {
        setCurrentUserLiked(false);
        setNumLike(numLike - 1);
      } else {
        setCurrentUserLiked(true);
        setNumLike(numLike + 1);
      }
    } catch (error) {
      console.error('An error occurred while making the follow request:', error);
      // Handle error if needed
    }
  };

  const handleComment = () => {
    
  };

  const handleShare = () => {
    // Display a popup indicating the post link has been copied
    const copyText = `http://localhost:3000/post/${post.id}`; // Replace with the actual post URL
    navigator.clipboard.writeText(copyText)
      .then(() => {
        // Clipboard write succeeded
        alert('Post link has been copied!');
      })
      .catch((error) => {
        // Clipboard write failed
        console.error('Failed to copy post link:', error);
      });
  };

  return (
    <div className="post">
      <div className="postLoop">
        <div className="postTop">
          <div className="postTopLeft">
            <img className="postProfileImg" src="/assets/person/1.jpeg" alt="Profile" />
            <div className="postUserName">{post.username}</div>
            <span className="postDate">{post.date}</span>
          </div>
          <div className="postTopRight">
            <EllipsisVertical color={'#ffffff'} height="20px" width="20px" />
          </div>
        </div>
        <div className="postContent">
          <div className="postImage">
            <img className="postImage" src={post.photo} alt="Post" />
          </div>
          <div className="postText">{post.desc}</div>
        </div>
        <div className="postBottom">
          <div className="postBottomUpper">
            <button className="postBottomUpperItem" onClick={handleLike}>
              {currentUserLiked ? (
                <Heart color={'#ff0000'} height="25px" width="25px" />
              ) : (
                <HeartOutline color={'#ffffff'} height="25px" width="25px" />
              )}
            </button>
            <button className="postBottomUpperItem" onClick={handleComment}>
              <ChatbubbleOutline color={'#ffffff'} height="25px" width="25px" />
            </button>
            <button className="postBottomUpperItem" onClick={handleShare}>
              <PaperPlaneOutline color={'#ffffff'} height="25px" width="25px" />
            </button>
          </div>
          <div className="postBottomLower">
            {numLike} {numLike === 1 ? 'like' : 'likes'}, {post.comments.length}{' '}
            {post.comments.length === 1 ? 'comment' : 'comments'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;