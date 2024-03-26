import ReactDOM from 'react-dom/client';
import React, { Component, useState } from 'react';
import './topbar_admin.css'
import { Home, People, Chatbubble, PeopleOutline, ChatbubbleOutline, SearchOutline, Create, CreateOutline, Heart, HeartOutline, Person, PersonOutline, Menu} from 'react-ionicons'
import ChipichpiLogo from './ChipichpiLogo.png';
import { useLocation, Link ,withRouter} from 'react-router-dom';

const Topbar_admin = () => {
    const location = useLocation()
    return <Topbar_admin_component location={location} />
  }

class Topbar_admin_component extends React.Component {
    render(){
        const { location } = this.props;
    return(
        <div className="topbarContainer_admin">
            <div className="topbaricon_admin">
            <Link to="/">
            <button
              className="topbarLogo"
              style={{
                backgroundImage: `url(${ChipichpiLogo})`
              }}
            ></button>
            </Link>
            </div>
            <div>
                <div className="topbarmiddle_admin" style={{alignContent: 'center'}}>
                <Link to='/admin_manage_post' className="topbarIconItem">
                {location.pathname.includes('/admin_manage_post') ? (
                    <People
                    color="#ffffff"
                    background="transparent"
                    height="30px"
                    width="30px"
                    />
                ) : (
                    <PeopleOutline
                    color="#555555"
                    background="transparent"
                    height="30px"
                    width="30px"
                    />
                )}
            </Link>
            <Link to='/admin_manage_user' className="topbarIconItem">
                {location.pathname.includes('/admin_manage_user') ? (
                    <Chatbubble
                    color="#ffffff"
                    background="transparent"
                    height="30px"
                    width="30px"
                    />
                ) : (
                    <ChatbubbleOutline
                    color="#555555"
                    background="transparent"
                    height="30px"
                    width="30px"
                    />
                )}
            </Link>
                </div>
            </div>
        </div>
                )}}

export default Topbar_admin;