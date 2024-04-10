import React, { useState } from 'react';
import './explore.css';
import Feed from '../components/Feed.jsx'
import Topbar from '../components/Topbar.jsx'
import { SwapHorizontal } from 'react-ionicons'
import CreatePost from '../components/CreatePost.jsx';

const Explore = ({ explore }) => {
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const currentUserId = sessionStorage.getItem('userID');
  // const currentUserId = '660970232846199a041ae117'; 
  const [isForYou, setIsForYou] = useState(false);

  const handleCreatePostOpen = () => {
    setIsCreatePostOpen(true);
  };

  const handleCreatePostClose = () => {
    setIsCreatePostOpen(false);
  };

  const handlePostsType = () => {
    setIsForYou(!isForYou);
  };

  return (
    <div className="explore">
      <Topbar />
      <div className="contentSwitch" onClick={handlePostsType}>
        <div className="switchItem">
          <SwapHorizontal color={'#ffffff'} height="30px" width="30px"/>
        </div>
        {
          isForYou ?
          <div className="switchItem">
            <label>For you</label>
          </div>
          :
          <div className="switchItem">
            <label>Explore</label>
          </div>
        }
      </div>
      {isCreatePostOpen && (
        <CreatePost trigger={true} onClose={handleCreatePostClose} />
      )}
      <div className="exploreContainer">
        <div className="share" onClick={handleCreatePostOpen}>
            <div className="shareContainer">
                <div className="shareLeft">
                    <img className='postProfileImg' src="/assets/person/10.jpeg"></img>
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
        </div>{
          isForYou ?
          <Feed activeButton={'explore'}/>
          :
          <Feed activeButton={'forYou'}/>
        }
      </div>
    </div>
  );
};

export default Explore;