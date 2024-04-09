import React, { useState, useEffect } from 'react';
import '../style.css';
import './profile.css';
import Topbar from '../components/Topbar';
import { Person } from 'react-ionicons';
import Feed from '../components/Feed';
import EditProfile from '../components/EditProfile';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Profile = ({ username }) => {
  const [user, setUser] = useState(null);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [activeButton, setActiveButton] = useState('posts');
  const { id } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/users/${id}`);
        setUser(res.data);
        console.log(res);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchUser();
  }, [id]);

  const handleEditProfileClick = () => {
    setIsEditProfileOpen(true);
  };

  const handleCloseEditProfile = () => {
    setIsEditProfileOpen(false);
  };

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  const handleFollowClick = () => {
    // Handle follow click logic
  };

  const handleMessageClick = () => {
    // Handle follow click logic
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile">
      <Topbar />
      <div className="profileContainer">
        <div className="profileInfo">
          <div className="profileNameAndId">
            <div className="profileName">
              <label>{user.username}</label>
            </div>
            <div className="profileId">
              <label>{user.username}</label>
            </div>
          </div>
          <div className="profilePicture">
            <div
              className="profilepic"
              style={{
                backgroundImage: `url(${user.profilePicture == "" ? "/assets/person/1.jpeg" : user.profilePicture})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '84px',
                width: '84px',
                borderRadius: '50%',
              }}
            ></div>
          </div>
        </div>
        <div className="profileBio">
          <label>{user.email}</label>
        </div>
        <div className="profileFollowersAndLink">
          <div className="profileFollowersContainer">
            <div className="profileFollowerPictures">
              <div
                className="followerprofilepic"
                style={{
                  backgroundImage: `url(${user.profilePicture == "" ? "assets/person/1.jpeg" : user.profilePicture})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: '14px',
                  width: '14px',
                  borderRadius: '50%',
                }}
              ></div>
              <div
                className="followerprofilepic"
                style={{
                  backgroundImage: `url(${user.profilePicture == "" ? "assets/person/1.jpeg" : user.profilePicture})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: '14px',
                  width: '14px',
                  borderRadius: '50%',
                }}
              ></div>
            </div>
            <div className="profileFollowers">
              <span className="followersNumbers">{user.followers.length}</span>
              <p>&emsp;Followers</p>
            </div>
          </div>
          <div className="profileLink">
            <Person color={'#ffffff'} height="30px" width="30px" />
          </div>
        </div>
        <div className="followAndMessage">
          <button className="editProfileButton" onClick={handleFollowClick}>
            Follow
          </button>
          <button className="editProfileButton" onClick={handleMessageClick}>
            Message
          </button>
        </div>
        <button className="editProfileButton" onClick={handleEditProfileClick}>
          Edit profile
        </button>
        <div className="profileSelection">
          <button
            className={`profileButton ${activeButton === 'posts' ? 'active' : ''}`}
            onClick={() => handleButtonClick('posts')}
          >
            Posts
          </button>
          <button
            className={`profileButton ${activeButton === 'followers' ? 'active' : ''}`}
            onClick={() => handleButtonClick('followers')}
          >
            Followers
          </button>
          <button
            className={`profileButton ${activeButton === 'following' ? 'active' : ''}`}
            onClick={() => handleButtonClick('following')}
          >
            Following
          </button>
        </div>
      </div>
      {activeButton === 'posts' && (
        <div className="profilePosts">
          {/* Render posts */}
        </div>
      )}
      {activeButton === 'followers' && (
        <div className="profileFollowers">
          {/* Render followers */}
        </div>
      )}
      {activeButton === 'following' && (
        <div className="profileFollowing">
          {/* Render following */}
        </div>
      )}
      {isEditProfileOpen && (
        <EditProfile
          onClose={handleCloseEditProfile}
          username={user.username}
          _id={user._id}
          email={user.email}
          profilePicture={user.profilePicture} // Corrected prop name
        />
        )}
    </div>
  );
};

export default Profile;