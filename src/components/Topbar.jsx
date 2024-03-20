import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './topbar.css';
import {
  Home,
  HomeOutline,
  Search,
  SearchOutline,
  Create,
  CreateOutline,
  Heart,
  HeartOutline,
  Person,
  PersonOutline,
  Menu
} from 'react-ionicons';
import ChipichpiLogo from './ChipichpiLogo.png';
import CreatePost from '../components/CreatePost.jsx';

const Topbar = () => {
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const currentUrl = location.pathname;
    // Update the state or perform other actions based on the URL condition
    // Example: setPersonSolid(currentUrl.includes('/profile'));
  }, [location.pathname]);

  const handleCreatePostOpen = () => {
    setIsCreatePostOpen(true);
  };

  const handleCreatePostClose = () => {
    setIsCreatePostOpen(false);
  };

  const handleSettingsToggle = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  const redirectToSettings = () => {
    window.location.href = "/settings";
  }
  
  const redirectToSaved = () => {
    window.location.href = "/saved";
  }
  
  const reportProblem = () => {
    window.location.href = "mailto:1155158520@link.cuhk.edu.hk?subject=ChipiChipi: Report a problem";
  }
  
  const logout = () => {
    // TODO: Clear token and perform any necessary logout actions
    // Example: Clear token from local storage
    localStorage.removeItem("token");
    window.location.href = "/";
  }

  return (
    <div className="topbarWithCreatePost">
      <div className="topbarContainer">
        <div className="topbarLeft">
          <a href="/">
            <button
              className="topbarLogo"
              style={{
                backgroundImage: `url(${ChipichpiLogo})`
              }}
            ></button>
          </a>
        </div>
        <div className="topbarCenter">
          <div className="topbarIcons">
            <button
              className="topbarIconItem"
              onClick={() => {
                window.location.href = '/explore';
              }}
            >
                {location.pathname.includes('/explore') ? (
                    <Home
                    color="#ffffff"
                    background="transparent"
                    height="30px"
                    width="30px"
                    />
                ) : (
                    <HomeOutline
                    color="#555555"
                    background="transparent"
                    height="30px"
                    width="30px"
                    />
                )}
            </button>
            <button
              className="topbarIconItem"
              onClick={() => {
                window.location.href = '/search';
              }}
            >
              {location.pathname.includes('/search') ? (
                    <Search
                    color="#ffffff"
                    background="transparent"
                    height="30px"
                    width="30px"
                    />
                ) : (
                    <SearchOutline
                    color="#555555"
                    background="transparent"
                    height="30px"
                    width="30px"
                    />
                )}
            </button>
            <button
              className="topbarIconItem"
              onClick={handleCreatePostOpen}
            >
              <CreateOutline
                color="#555555"
                background="transparent"
                height="30px"
                width="30px"
              />
            </button>
            <button
              className="topbarIconItem"
              onClick={() => {
                window.location.href = '/notification';
              }}
            >
              {location.pathname.includes('/notification') ? (
                    <Heart
                    color="#ffffff"
                    background="transparent"
                    height="30px"
                    width="30px"
                    />
                ) : (
                    <HeartOutline
                    color="#555555"
                    background="transparent"
                    height="30px"
                    width="30px"
                    />
                )}
            </button>
            <button
              className="topbarIconItem"
              onClick={() => {
                window.location.href = '/profile';
              }}
            >
              {location.pathname.includes('/profile') ? (
                    <Person
                    color="#ffffff"
                    background="transparent"
                    height="30px"
                    width="30px"
                    />
                ) : (
                    <PersonOutline
                    color="#555555"
                    background="transparent"
                    height="30px"
                    width="30px"
                    />
                )}
            </button>
          </div>
        </div>
        <div className="topbarRight">
          <button className="topbarSettingsBtn" onClick={handleSettingsToggle}>
            <Menu
              color="#ffffff"
              background="transparent"
              height="30px"
              width="30px"
            />
          </button>
          {isSettingsOpen && (
            <ul className="topbarSettingsList">
                <li>
                <button className="topbarSettingsItem" onClick={redirectToSettings}>
                    Settings
                </button>
                </li>
                <li>
                <button className="topbarSettingsItem" onClick={redirectToSaved}>
                    Saved
                </button>
                </li>
                <li>
                <button className="topbarSettingsItem" onClick={reportProblem}>
                    Report a Problem
                </button>
                </li>
                <li>
                <button className="topbarSettingsItem" onClick={logout}>
                    Log Out
                </button>
                </li>
            </ul>
          )}
        </div>
      </div>
      {isCreatePostOpen && (
        <CreatePost trigger={true} onClose={handleCreatePostClose} />
      )}
    </div>
  );
};

export default Topbar;