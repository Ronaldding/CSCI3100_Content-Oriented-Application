import React, { useEffect, useState } from 'react';
import './feed.css';
import Post from './Post.jsx';
import { Posts, PostsReplies } from '../dummyData.js';
import { PostsReposts } from '../dummyData.js';
import axios from 'axios';

const Feed = ({ activeButton }) => {
  const [feedContent, setFeedContent] = useState([]);

  useEffect(() => {
    if (activeButton === 'explore') {
      const fetchPosts = async () => {
        try {
          const res = await axios.get('http://localhost:8800/contentExplore');
          setFeedContent(res.data);
          console.log(res);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchPosts();
    } else if (activeButton === 'replies') {
      const fetchPosts = async () => {
        try {
          const res = await axios.get('http://localhost:8800/contentExplore');
          setFeedContent(res.data);
          console.log(res);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchPosts();
    } else if (activeButton === 'reposts') {
      const fetchPosts = async () => {
        try {
          const res = await axios.get('http://localhost:8800/contentExplore');
          setFeedContent(res.data);
          console.log(res);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchPosts();
    } else if (activeButton === 'posts') {
      const fetchPosts = async () => {
        try {
          const res = await axios.get('http://localhost:8800/contentExplore');
          setFeedContent(res.data);
          console.log(res);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchPosts();
    } else {
      setFeedContent(Posts);
    }
  }, [activeButton]);

  return (
    <div className="feed">
      {feedContent.map((post, index) => (
        <div>
          <Post key={index} post={post} />
          <div className="space"></div>
        </div>
      ))}
    </div>
  );
};

export default Feed;