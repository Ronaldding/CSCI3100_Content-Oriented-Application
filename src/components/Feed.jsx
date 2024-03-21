import React from 'react';
import './feed.css';
import Post from './Post.jsx';
import { Posts } from '../dummyData.js';
import { PostsReplies } from '../dummyData.js';
import { PostsReposts } from '../dummyData.js';

const Feed = ({ activeButton }) => {
  const feedContent = 
  activeButton === 'posts' ? Posts : 
  activeButton === 'replies' ? PostsReplies : 
  activeButton === 'reposts' ? PostsReposts: 
  Posts;

  return (
    <div className="feed">
      <Post props={feedContent} />
    </div>
  );
};

export default Feed;