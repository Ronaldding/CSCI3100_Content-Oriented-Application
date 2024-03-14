import React, { useState } from 'react';
import './share.css';

const Share = ({ share }) => {

  return (
    <div className="share">
        <div className="shareContainer">
            <div className="shareLeft">
                <img className='postProfileImg' src="/assets/person/1.jpeg"></img>
                <div className="shareText">
                    <label>Start a Tweet...</label>
                </div>
            </div>
            <div className="shareRight">
                <div className="postBtn">
                    <label>Post</label>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Share;