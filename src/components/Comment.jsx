import React, { useState } from 'react';
import './comment.css';
import { EllipsisVertical, HeartOutline, ChatbubbleOutline, PaperPlaneOutline } from 'react-ionicons'


const Comment = ({ comment }) => {

  return (
    <div className="commentContainer">
      <div className="comment">
        <div className="commentTop">
          <div className="commentTopLeft">
            <img className='commentProfileImg' src="/assets/person/1.jpeg"></img>
            <div className="commentUserName">
              Into_the_unknown
            </div>
            <span className="commentDate"> 5 h</span>
          </div>
          <div className="commentTopRight">
            <EllipsisVertical color={'#ffffff'} height="20px" width="20px"/>
          </div>
        </div>
        <div className="commentContent">
          <div className="commentText">
            XD
          </div>
        </div>
        <div className="commentBottom">
          <div className="commentBottomUpper">
            <div className="commentBottomUpperItem">
              <HeartOutline color={'#ffffff'} height="25px" width="25px"/>
            </div>
            <div className="commentBottomUpperItem">
              <ChatbubbleOutline color={'#ffffff'} height="25px" width="25px"/>
            </div>
            <div className="commentBottomUpperItem">
              <PaperPlaneOutline color={'#ffffff'} height="25px" width="25px"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;