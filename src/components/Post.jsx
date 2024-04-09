import React, { useState, useEffect } from 'react';
import './post.css';
import { EllipsisVertical, HeartOutline, ChatbubbleOutline, PaperPlaneOutline, Heart } from 'react-ionicons';
import axios from 'axios';

const Post = ({ post }) => {
  const currentUserId = '660970232846199a041ae117'; // Replace with the current user's ID
  const [currentUserLiked, setCurrentUserLiked] = useState(false);
  const [numLike, setNumLike] = useState(0);
  const [numComments, setNumComments] = useState(0);

  useEffect(() => {
    if (post.likes) {
      setCurrentUserLiked(post.likes.includes(currentUserId));
      setNumLike(post.likes.length);
    }

    if (post.comments) {
      setNumComments(post.comments.length);
    }
  }, [post, currentUserId]);

  const handleLike = async () => {
    try {
      const url = `http://localhost:8800/post/${post._id}/like`;
      const response = await axios.put(url, { userId: currentUserId });

      if (response.ok) {
        console.log(response.data); // Log the response if needed
      } else {
        console.error(response.data); // Log the error response if needed
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
    // Handle comment functionality
  };

  const handleShare = () => {
    // Display a popup indicating the post link has been copied
    const copyText = `http://localhost:3000/post/${post._id}`; // Replace with the actual post URL
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
            {numLike} {numLike === 1 ? 'like' : 'likes'}, {numComments}{' '}
            {numComments === 1 ? 'comment' : 'comments'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;