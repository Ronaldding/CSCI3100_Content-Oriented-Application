import React, { useEffect, useState } from 'react';
import './feed.css';
import Post from './Post.jsx';
import { PostsReplies } from '../dummyData.js';
import { PostsReposts } from '../dummyData.js';
import axios from 'axios';

const Feed = ({ activeButton }) => {
  const [feedContent, setFeedContent] = useState([]);

  useEffect(() => {
    if (activeButton === 'posts') {
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
      setFeedContent(PostsReplies);
    } else if (activeButton === 'reposts') {
      setFeedContent(PostsReposts);
    } else {
      fetch('http://localhost:8800/contentExplore')
        .then(response => response.json())
        .then(data => setFeedContent(data));
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