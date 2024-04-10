import React from 'react';
import './comment.css';
import { EllipsisVertical, HeartOutline, ChatbubbleOutline, PaperPlaneOutline } from 'react-ionicons';

const Comment = ({ comments }) => {
  if (!comments || comments.length === 0) {
    return null; // Render nothing if comments are not provided or empty
  }

  return (
    <div>
      {comments.map((comment) => (
        <div className="commentContainer" key={comment.id}>
          <div className="comment">
            <div className="commentTop">
              <div className="commentTopLeft">
                <img className="commentProfileImg" src="/assets/person/1.jpeg" alt="Profile" />
                <div className="commentUserName">{comment.username}</div>
                <span className="commentDate">{comment.date}</span>
              </div>
              <div className="commentTopRight">
                <EllipsisVertical color={'#ffffff'} height="20px" width="20px" />
              </div>
            </div>
            <div className="commentContent">
              <div className="commentText">{comment.desc}</div>
            </div>
            <div className="commentBottom">
              <div className="commentBottomUpper">
                <div className="commentBottomUpperItem">
                  <HeartOutline color={'#ffffff'} height="25px" width="25px" />
                </div>
                <div className="commentBottomUpperItem">
                  <ChatbubbleOutline color={'#ffffff'} height="25px" width="25px" />
                </div>
                <div className="commentBottomUpperItem">
                  <PaperPlaneOutline color={'#ffffff'} height="25px" width="25px" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comment;