import React, { useState } from 'react';
import './postDetails.css';
import Feed from '../components/Feed.jsx'
import Topbar from '../components/Topbar.jsx'
import Comment from '../components/Comment.jsx'
import { SwapHorizontal } from 'react-ionicons'

const PostDetails = ({ postDetails }) => {

  return (
    <div className="postDetails">
      <Topbar />
      <div className="postDetailsContainer">
        <Feed />
        <div className="reply">
            <div className="replyContainer">
                <div className="replyLeft">
                    <img className='postProfileImg' src="/assets/person/1.jpeg"></img>
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