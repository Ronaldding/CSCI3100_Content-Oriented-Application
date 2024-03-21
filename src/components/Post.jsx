import React, { useState } from 'react';
import './post.css';
import { EllipsisVertical, HeartOutline, ChatbubbleOutline, PaperPlaneOutline } from 'react-ionicons'

const Post = ({ props }) => {

  return (
    <div className="post">
      <div className="postTop">
        <div className="postTopLeft">
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
      <div className="postContent">
        <div className="postImage">
        <img className='postImage' src="/assets/post/11.jpeg"></img>
        </div>
        <div className="postText">
          買完之後成日攞錯
        </div>
      </div>
      <div className="postBottom">
        <div className="postBottomUpper">
          <div className="postBottomUpperItem">
            <HeartOutline color={'#ffffff'} height="25px" width="25px"/>
          </div>
          <div className="postBottomUpperItem">
            <ChatbubbleOutline color={'#ffffff'} height="25px" width="25px"/>
          </div>
          <div className="postBottomUpperItem">
            <PaperPlaneOutline color={'#ffffff'} height="25px" width="25px"/>
          </div>
        </div>
        <div className="postBottomLower">
          1,234 comments, 5,432 likes
        </div>
      </div>
    </div>
  );
};

export default Post;