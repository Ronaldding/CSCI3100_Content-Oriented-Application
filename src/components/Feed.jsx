import React, { useEffect, useState} from 'react';
import './feed.css';
import Post from './Post.jsx';
import { Posts, PostsReplies } from '../dummyData.js';
import { PostsReposts } from '../dummyData.js';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Feed = ({ activeButton, tags }) => {
  const [feedContent, setFeedContent] = useState([]);
  const { id } = useParams();
  const currentUserId = sessionStorage.getItem('userID');
  // const currentUserId = '660970232846199a041ae117'; 

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
    } else if (activeButton === 'forYou') {
      const fetchPosts = async () => {
        try {
          const res = await axios.get(`http://localhost:8800/post/timeline/${currentUserId}`);
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
          const res = await axios.get(`http://localhost:8800/post/timeline/${id}`);
          setFeedContent(res.data);
          console.log(res);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchPosts();
    } else if (activeButton === 'saved') {
      const fetchPosts = async () => {
        try {
          const res = await axios.get(`http://localhost:8800/post/timeline/saved/${currentUserId}`);
          setFeedContent(res.data);
          console.log(res);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchPosts();
    } else if (activeButton === 'search') {
      console.log(tags);
      const fetchPosts = async () => {
        try {
          const res = await axios.get(`http://localhost:8800/post/search/tags?tags=${tags}`);
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