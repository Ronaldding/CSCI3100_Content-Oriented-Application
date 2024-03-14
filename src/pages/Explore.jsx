import React, { useState } from 'react';
import './explore.css';
import Feed from '../components/Feed.jsx'
import Topbar from '../components/Topbar.jsx'
import Share from '../components/Share.jsx'
import { SwapHorizontal } from 'react-ionicons'

const Explore = ({ explore }) => {

  return (
    <div className="explore">
      <div className="contentSwitch">
        <div className="switchItem">
          <SwapHorizontal color={'#ffffff'} height="30px" width="30px"/>
        </div>
        <div className="switchItem">
          <label>For you</label>
        </div>
      </div>
      <Topbar />
      <div className="exploreContainer">
        <Share />
        <Feed />
        <Feed />
        <Feed />
        <Feed />
        <Feed />
      </div>
    </div>
  );
};

export default Explore;