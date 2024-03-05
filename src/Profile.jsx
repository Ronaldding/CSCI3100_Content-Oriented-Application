import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import './style.css';
import './profile.css'
import Topbar from './components/Topbar.jsx'
import { Person } from 'react-ionicons'
import demoProfilePic from './demoProfilePic.png'

class Profile extends React.Component {
    render(){
    return(
        <div className="profile">
            <Topbar />
            <div className="profileContainer">
                <div className="profileInfo">
                    <div className="profileNameAndId">
                        <div className="profileName">
                            Ronald Ding
                        </div>
                        <div className="profileId">
                            @ronald_ding
                        </div>
                    </div>
                    <div className="profilePicture">
                        <div className="profilepic" style={{ backgroundImage: `url(${demoProfilePic})`, display: 'flex', alignItems: 'center',justifyContent: 'center', backgroundSize: 'cover',backgroundPosition: 'center', height: '84px', width: '84px', borderRadius: '50%'}}></div>
                    </div>
                </div>
                <div className="profileBio">
                    🐿️ 🏕️ 📖🤖🏋️🎥☕️🍫Live Love Laugh Be kind
                </div>
                <div className="profileFollowersAndLink">
                    <div className="profileFollowersContainer">
                        <div className="profileFollowerPictures">
                            <Person color={'#ffffff'} height="12px" width="12px"/>
                            <Person color={'#ffffff'} height="12px" width="12px"/>
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
                <div className="editProfile">
                    Edit profile
                </div>
                <div className="profileSelection">
                    <div className="profilePosts">
                        Posts
                        <div className="profilePostsLine"></div>
                    </div>
                    <div className="profileReplies">
                        Replies
                        <div className="profileRepliesLine"></div>
                    </div>
                    <div className="profileReposts">
                        Reposts
                        <div className="profileRepostsLine"></div>
                    </div>
                </div>
                <div className="Content"></div>
            </div>
        </div>
    )
    }}

export default Profile;