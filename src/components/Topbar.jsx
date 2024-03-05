import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import './topbar.css'
import { Home, HomeOutline, Search, SearchOutline, Create, CreateOutline, Heart, HeartOutline, Person, PersonOutline } from 'react-ionicons'

class Login extends React.Component {
    render(){
    return(
        <div className="topbarContainer">
            <div className="topbarLeft">
                Logo
            </div>
            <div className="topbarCenter">
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <HomeOutline color={'#555555'} height="30px" width="30px"/>
                    </div>
                    <div className="topbarIconItem">
                        <SearchOutline color={'#555555'} height="30px" width="30px"/>
                    </div>
                    <div className="topbarIconItem">
                        <CreateOutline color={'#555555'} height="30px" width="30px"/>
                    </div>
                    <div className="topbarIconItem">
                        <HeartOutline color={'#555555'} height="30px" width="30px"/>
                    </div>
                    <div className="topbarIconItem">
                        <Person color={'#ffffff'} height="30px" width="30px"/>
                    </div>
                </div>
            </div>
            <div className="topbarRight">
                Settings
            </div>
        </div>
    )
    }}

export default Login;