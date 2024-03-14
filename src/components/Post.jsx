import React, { useState } from 'react';
import './post.css';
import { EllipsisVertical } from 'react-ionicons'

const Post = ({ post }) => {

  return (
    <div className="post">
      <div className="postTop">
        <div className="postLeft">
          <img className='postProfileImg' src="/assets/person/1.jpeg"></img>
          <div className="postUserName">
            ronald_ding
          </div>
          <span className="postDate"> 5 h</span>
        </div>
        <div className="postTopRight">
          <EllipsisVertical color={'#ffffff'} height="20px" width="20px"/>
        </div>
      </div>
      
    </div>
  );
};

export default Post;