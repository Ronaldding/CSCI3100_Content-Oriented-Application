import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import '../style.css';
import './profile.css'
import Topbar from '../components/Topbar.jsx'
import { Person } from 'react-ionicons'
import demoProfilePic from '../demoProfilePic.jpg'
import Feed from '../components/Feed.jsx'
import EditProfile from '../components/EditProfile.jsx';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          isEditProfileOpen: false,
        };
      }
    
      handleEditProfileClick = () => {
        this.setState({ isEditProfileOpen: true });
      };
    
      handleCloseEditProfile = () => {
        this.setState({ isEditProfileOpen: false });
      };

    render(){
    return(
        <div className="profile">
            <Topbar />
            <div className="profileContainer">
                <div className="profileInfo">
                    <div className="profileNameAndId">
                        <div className="profileName">
                            <label>Ronald Ding</label>
                        </div>
                        <div className="profileId">
                            <label>@ronald_ding</label>
                        </div>
                    </div>
                    <div className="profilePicture">
                        <div className="profilepic" style={{ backgroundImage: `url(${demoProfilePic})`, display: 'flex', alignItems: 'center',justifyContent: 'center', backgroundSize: 'cover',backgroundPosition: 'center', height: '84px', width: '84px', borderRadius: '50%'}}></div>
                    </div>
                </div>
                <div className="profileBio">
                    <label>🐿️ 🏕️ 📖🤖🏋️🎥☕️🍫Live Love Laugh Be kind</label>
                </div>
                <div className="profileFollowersAndLink">
                    <div className="profileFollowersContainer">
                        <div className="profileFollowerPictures">
                            <div className="followerprofilepic" style={{ backgroundImage: `url(${demoProfilePic})`, display: 'flex', alignItems: 'center',justifyContent: 'center', backgroundSize: 'cover',backgroundPosition: 'center', height: '14px', width: '14px', borderRadius: '50%'}}></div>
                            <div className="followerprofilepic" style={{ backgroundImage: `url(${demoProfilePic})`, display: 'flex', alignItems: 'center',justifyContent: 'center', backgroundSize: 'cover',backgroundPosition: 'center', height: '14px', width: '14px', borderRadius: '50%'}}></div>
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
                <div className="editProfile" onClick={this.handleEditProfileClick}>
                    <label>Edit profile</label>
                </div>
                <div className="profileSelection">
                    <button className="profilePosts">
                        <label>Posts</label>
                    </button>
                    <button className="profileReplies">
                        <label>Replies</label>
                    </button>
                    <button className="profileReposts">
                        <label>Reposts</label>
                    </button>
                </div>
                <Feed />
            </div>
            {this.state.isEditProfileOpen && (
            <EditProfile onClose={this.handleCloseEditProfile} />
            )}
        </div>
    )
    }} 

export default Profile;