import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import '../style.css';
import './profile.css'
import Topbar from '../components/Topbar.jsx'
import { Person } from 'react-ionicons'
import Feed from '../components/Feed.jsx'
import EditProfile from '../components/EditProfile.jsx';

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

    render(){
        const name = "Ronald Ding";
        const id = "@ronald_ding";
        const bio = "🐿️ 🏕️ 📖🤖🏋️🎥☕️🍫Live Love Laugh Be kind";
        const profilePic = '/assets/person/1.jpeg';
        const { activeButton } = this.state;
    return(
        <div className="profile">
            <Topbar />
            <div className="profileContainer">
                <div className="profileInfo">
                    <div className="profileNameAndId">
                        <div className="profileName">
                        <label>{name}</label>
                        </div>
                        <div className="profileId">
                        <label>{id}</label>
                        </div>
                    </div>
                    <div className="profilePicture">
                        <div
                        className="profilepic"
                        style={{
                            backgroundImage: `url(${profilePic})`,
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
                <label>{bio}</label>
                </div>
                <div className="profileFollowersAndLink">
                    <div className="profileFollowersContainer">
                    <div className="profileFollowerPictures">
                        <div
                            className="followerprofilepic"
                            style={{
                            backgroundImage: `url(${profilePic})`,
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
                            backgroundImage: `url(${profilePic})`,
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
                <button className="editProfileButton" onClick={this.handleEditProfileClick}>
                    <label>Edit profile</label>
                </button>
                <div className="profileSelection">
                    <button
                        className={`profileButton ${activeButton === 'posts' ? 'active' : ''}`}
                        onClick={() => this.handleButtonClick('posts')}
                    >
                        <label>Posts</label>
                    </button>
                    <button
                        className={`profileButton ${activeButton === 'replies' ? 'active' : ''}`}
                        onClick={() => this.handleButtonClick('replies')}
                    >
                        <label>Replies</label>
                    </button>
                    <button
                        className={`profileButton ${activeButton === 'reposts' ? 'active' : ''}`}
                        onClick={() => this.handleButtonClick('reposts')}
                    >
                        <label>Reposts</label>
                    </button>
                </div>
                <Feed activeButton={activeButton} />
            </div>
            {this.state.isEditProfileOpen && (
            <EditProfile onClose={this.handleCloseEditProfile} />
            )}
        </div>
    )
    }} 

export default Profile;