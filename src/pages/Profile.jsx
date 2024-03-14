import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import '../style.css';
import './profile.css'
import Topbar from '../components/Topbar.jsx'
import { Person } from 'react-ionicons'
import demoProfilePic from '../demoProfilePic.jpg'
import Feed from '../components/Feed.jsx'

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
                <div className="editProfile">
                    Edit profile
                </div>
                <div className="profileSelection">
                    <button className="profilePosts">
                        Posts
                    </button>
                    <button className="profileReplies">
                        Replies
                    </button>
                    <button className="profileReposts">
                        Reposts
                    </button>
                </div>
                <Feed />
            </div>
        </div>
    )
    }} 

export default Profile;