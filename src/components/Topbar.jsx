import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import './topbar.css'
import { Home, HomeOutline, Search, SearchOutline, Create, CreateOutline, Heart, HeartOutline, Person, PersonOutline, Menu} from 'react-ionicons'
import ChipichpiLogo from './ChipichpiLogo.png';

class Login extends React.Component {
    render(){
    return(
        <div className="topbarContainer">
            <div className="topbarLeft">
                <div className="topbarLogo" style={{ backgroundImage: `url(${ChipichpiLogo})`, display: 'flex', alignItems: 'center',justifyContent: 'center', backgroundSize: 'cover',backgroundPosition: 'center', height: '40px'}}></div>
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
                        <span className="topbarIconBadge"></span>
                    </div>
                    <div className="topbarIconItem">
                        <Person color={'#ffffff'} height="30px" width="30px"/>
                        <span className="topbarIconBadge"></span>
                    </div>
                </div>
            </div>
            <div className="topbarRight">
                <Menu color={'#555555'} height="30px" width="30px"/>
            </div>
        </div>
    )
    }}

export default Login;