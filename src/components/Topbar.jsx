import ReactDOM from 'react-dom/client';
import React, { Component, useState } from 'react';
import './topbar.css'
import { Home, HomeOutline, Search, SearchOutline, Create, CreateOutline, Heart, HeartOutline, Person, PersonOutline, Menu} from 'react-ionicons'
import ChipichpiLogo from './ChipichpiLogo.png';
import CreatePost from '../components/CreatePost.jsx';

function turnOnBackground(e) {
    e.target.style.background = 'rgba(100, 100, 100, 0.5)';
}

function turnOffBackground(e) {
    e.target.style.background = 'rgba(0, 0, 0, 0)';
}

function turnOnColor(e) {
    e.target.style.color = '#ffffff';
}

function turnOffColor(e) {
    e.target.style.color = '#555555';
}

const Topbar = () => {
    const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

    const handleCreatePostOpen = () => {
        setIsCreatePostOpen(true);
    };

    const handleCreatePostClose = () => {
        setIsCreatePostOpen(false);
    };
    return(
        <div className="topbarWithCreatePoat">
            <div className="topbarContainer">
                <div className="topbarLeft">
                    <a href='/' >
                        <button className="topbarLogo" style={{ backgroundImage: `url(${ChipichpiLogo})`, display: 'flex', alignItems: 'center',justifyContent: 'center', backgroundSize: 'cover',backgroundPosition: 'center', height: '40px'}}></button>
                    </a>
                </div>
                <div className="topbarCenter">
                    <div className="topbarIcons">
                        <button className="topbarIconItem" onClick={(e) => {e.preventDefault(); window.location.href='/explore';}} onMouseEnter={turnOnBackground} onMouseLeave={turnOffBackground} >
                            <HomeOutline color={'#555555'} background={'rgba(0, 0, 0, 0)'} height="30px" width="30px"/>
                        </button>
                        <button className="topbarIconItem" onClick={(e) => {e.preventDefault(); window.location.href='/search';}} onMouseEnter={turnOnBackground} onMouseLeave={turnOffBackground}>
                            <SearchOutline color={'#555555'} background={'rgba(0, 0, 0, 0)'} height="30px" width="30px"/>
                        </button>
                        <button className="topbarIconItem" onClick={handleCreatePostOpen} onMouseEnter={turnOnBackground} onMouseLeave={turnOffBackground}>
                            <CreateOutline color={'#555555'} background={'rgba(0, 0, 0, 0)'} height="30px" width="30px"/>
                        </button>
                        <button className="topbarIconItem" onClick={(e) => {e.preventDefault(); window.location.href='/notifications';}} onMouseEnter={turnOnBackground} onMouseLeave={turnOffBackground}>
                            <HeartOutline color={'#555555'} background={'rgba(0, 0, 0, 0)'} height="30px" width="30px"/>
                            <span className="topbarIconBadge" background={'red'}></span>
                        </button>
                        <button className="topbarIconItem" onClick={(e) => {e.preventDefault(); window.location.href='/profile';}} onMouseEnter={turnOnBackground} onMouseLeave={turnOffBackground}>
                            <PersonOutline color={'#555555'} background={'rgba(0, 0, 0, 0)'} height="30px" width="30px"/>
                        </button>
                    </div>
                </div>
                <div className="topbarRight">
                    <button className="topbarSettingsBtn" onMouseEnter={turnOnColor} onMouseLeave={turnOffColor}>
                        <Menu color={'#555555'} height="30px" width="30px"/>
                    </button>
                </div>
                {/* <div className="topbarSettingsList">
                    <button className="topbarSettingsItem" onClick={(e) => {e.preventDefault(); window.location.href='/profile';}}>
                        Settings
                    </button>
                    <div className="topbarSettingsLine"></div>
                    <button className="topbarSettingsItem" onClick={(e) => {e.preventDefault(); window.location.href='/profile';}}>
                        Saved
                    </button>
                    <div className="topbarSettingsLine"></div>
                    <button className="topbarSettingsItem" onClick={(e) => {e.preventDefault(); window.location.href='/profile';}}>
                        Report a problem
                    </button>
                    <div className="topbarSettingsLine"></div>
                    <button className="topbarSettingsItem" onClick={(e) => {e.preventDefault(); window.location.href='/profile';}}>
                        {window.location.href}
                        Log out
                    </button>
                </div> */}
            </div>
            {isCreatePostOpen && (
                <CreatePost trigger={true} onClose={handleCreatePostClose} />
            )}
        </div>
    )
};

export default Topbar;