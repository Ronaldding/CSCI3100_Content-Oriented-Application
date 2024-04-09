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
  const currentUserId = '660970232846199a041ae117'; // Replace with the current user's ID
  const [postContent, setPostContent] = useState([]);

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
                <label>Tweet a reply</label>
              </div>
            </div>
            <div className="replyRight">
              <div className="postBtn">
                <label>Reply</label>
              </div>
            </div>
          </div>
        </div>
        <Comment />
      </div>
    </div>
  );
};

export default PostDetails;