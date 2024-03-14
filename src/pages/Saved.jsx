import React, { useState } from 'react';
import './saved.css';
import Feed from '../components/Feed.jsx'
import Topbar from '../components/Topbar.jsx'
import Share from '../components/Share.jsx'

const Saved = ({ saved }) => {

  return (
    <div className="saved">
        <Topbar />
        <div className="savedContainer">
            <label>Posts that you save will appear here.</label>
        </div>
    </div>
  );
};

export default Saved;