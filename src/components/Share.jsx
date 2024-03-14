import React, { useState } from 'react';
import './share.css';
import demoProfilePic from './demoProfilePic.jpg';

const Share = ({ share }) => {

  return (
    <div className="share">
      <div className="profilePicture">
        Pic
      </div>
      <div className="shareText">
        Strat a Tweets
      </div>
      <div className="postBtn">
        Post
      </div>
    </div>
  );
};

export default Share;