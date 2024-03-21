import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import '../style.css';
import './profile.css'
import Topbar from '../components/Topbar.jsx'
import { Person } from 'react-ionicons'
import Feed from '../components/Feed.jsx'
import EditProfile from '../components/EditProfile.jsx';
import {Posts} from '../dummyData.js'

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          isEditProfileOpen: false,
          activeButton: 'posts',
        };
      }
    
      handleEditProfileClick = () => {
        this.setState({ isEditProfileOpen: true });
      };
    
      handleCloseEditProfile = () => {
        this.setState({ isEditProfileOpen: false });
      };

      handleButtonClick = (button) => {
        this.setState({ activeButton: button });
      };

      handleFollowClick = () => {
        this.setState({  });
      };

    render(){
        const profileInfo = {
            "name" : "Ronald Ding",
            "id" : "@ronald_ding",
            "bio" : "🐿️ 🏕️ 📖🤖🏋️🎥☕️🍫Live Love Laugh Be kind",
            "profilePic" : '/assets/person/10.jpeg'
        };
        
        const { activeButton } = this.state;
    return(
        <div className="profile">
            <Topbar />
            <div className="profileContainer">
                <div className="profileInfo">
                    <div className="profileNameAndId">
                        <div className="profileName">
                        <label>{profileInfo.name}</label>
                        </div>
                        <div className="profileId">
                        <label>{profileInfo.id}</label>
                        </div>
                    </div>
                    <div className="profilePicture">
                        <div
                        className="profilepic"
                        style={{
                            backgroundImage: `url(${profileInfo.profilePic})`,
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
                <label>{profileInfo.bio}</label>
                </div>
                <div className="profileFollowersAndLink">
                    <div className="profileFollowersContainer">
                    <div className="profileFollowerPictures">
                        <div
                            className="followerprofilepic"
                            style={{
                            backgroundImage: `url(${profileInfo.profilePic})`,
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
                            backgroundImage: `url(${profileInfo.profilePic})`,
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
                        <span className="followersNumbers">133</span>
                        <p>&emsp;Followers</p>
                        </div>
                    </div>
                    <div className="profileLink">
                        <Person color={'#ffffff'} height="30px" width="30px"/>
                    </div>
                </div>
                <div className="followAndMessage">
                    <button className="editProfileButton" onClick={this.handleFollowClick}>
                        Follow
                    </button>
                    <button className="editProfileButton" onClick={this.handleMessageClick}>
                        Message
                    </button>
                </div>
                <button className="editProfileButton" onClick={this.handleEditProfileClick}>
                    Edit profile
                </button>
                <div className="profileSelection">
                    <button
                        className={`profileButton ${activeButton === 'posts' ? 'active' : ''}`}
                        onClick={() => this.handleButtonClick('posts')}
                    >
                        Posts
                    </button>
                    <button
                        className={`profileButton ${activeButton === 'replies' ? 'active' : ''}`}
                        onClick={() => this.handleButtonClick('replies')}
                    >
                        Replies
                    </button>
                    <button
                        className={`profileButton ${activeButton === 'reposts' ? 'active' : ''}`}
                        onClick={() => this.handleButtonClick('reposts')}
                    >
                        Reposts
                    </button>
                </div>
                <Feed activeButton={activeButton} posts={Posts}/>
            </div>
            {this.state.isEditProfileOpen && (
            <EditProfile onClose={this.handleCloseEditProfile} profileInfo={profileInfo}/>
            )}
        </div>
    )
    }} 

export default Profile;