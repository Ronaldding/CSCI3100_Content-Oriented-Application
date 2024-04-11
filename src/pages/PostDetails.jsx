import React, { useState, useEffect } from 'react';
import './postDetails.css';
import Post from '../components/Post.jsx'
import Topbar from '../components/Topbar.jsx'
import Comment from '../components/Comment.jsx'
import { SwapHorizontal } from 'react-ionicons'
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PostDetails = () => {
  const { id } = useParams();
  const currentUserId = sessionStorage.getItem('userID');
  // const currentUserId = '660970232846199a041ae117'; 
  const [postContent, setPostContent] = useState([]);
  const [replyText, setReplyText] = useState('');
  const [retweetText, setRetweetText] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/post/${id}`);
        setPostContent(res.data);
        console.log(res);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, []); // Added an empty dependency array

  // Function to handle reply text input change
  const handleReplyTextChange = (event) => {
    setReplyText(event.target.value);
  };
  const handleRetweetTextChange = (event) => {
    setRetweetText(event.target.value);
  };

  // Function to handle replying to the post
  const handleReply = async () => {
    try {
      const commentData = {
        userId: currentUserId,
        comment: replyText
      };

      const res = await axios.post(`http://localhost:8800/post/${id}/comment`, commentData);
      console.log(res.data); // Assuming the server responds with the newly created comment

      // Clear the reply text input
      setReplyText('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleRetweet = async () => {
    try {
      const commentData = {
        userId: currentUserId,
        desc: replyText
      };

      const res = await axios.post(`http://localhost:8800/retweet/${id}`, commentData);
      console.log(res.data); // Assuming the server responds with the newly created comment

      // Clear the reply text input
      setReplyText('');
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className="postDetails">
      <Topbar />
      <div className="postDetailsContainer">
        <Post post={postContent} />
        <div className="reply">
          <div className="replyContainer">
            <div className="replyLeft">
              <img className='postProfileImg' src="/assets/person/1.jpeg" alt="Profile" />
              <div className="replyText">
                <input
                  type="text"
                  className="replyInput"
                  placeholder="Tweet a reply"
                  value={replyText}
                  onChange={handleReplyTextChange}
                />
              </div>
            </div>
            <div className="replyRight">
              <div className="postBtn" onClick={handleReply}>
                <label>Reply</label>
              </div>
            </div>
          </div>
        </div>
        <div className="reply">
          <div className="replyContainer">
            <div className="replyLeft">
              <img className='postProfileImg' src="/assets/person/1.jpeg" alt="Profile" />
              <div className="replyText">
                <input
                  type="text"
                  className="replyInput"
                  placeholder="Tweet a reply"
                  value={replyText}
                  onChange={handleRetweetTextChange}
                />
              </div>
            </div>
            <div className="replyRight">
              <div className="postBtn" onClick={handleRetweet}>
                <label>Retweet</label>
              </div>
            </div>
          </div>
        </div>
        <Comment post={postContent} />
      </div>
    </div>
  );
};

export default PostDetails;