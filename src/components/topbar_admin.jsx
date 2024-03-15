import ReactDOM from 'react-dom/client';
import React, { Component, useState } from 'react';
import './topbar.css'
import { Home, PeopleOutline, ChatbubbleOutline, SearchOutline, Create, CreateOutline, Heart, HeartOutline, Person, PersonOutline, Menu} from 'react-ionicons'
import ChipichpiLogo from './ChipichpiLogo.png';

class Topbar_admin extends React.Component {
    render(){
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
    return(
        <div className="topbarContainer">
            <div className="topbaricon_admin">
                <a href='/' >
                    <button className="topbarLogo" style={{ backgroundImage: `url(${ChipichpiLogo})`, display: 'flex', alignItems: 'center',justifyContent: 'center', backgroundSize: 'cover',backgroundPosition: 'center', height: '40px'}}></button>
                </a>
            </div>
            <div>
                <div className="topbarmiddle_admin" style={{alignContent: 'center'}}>
                    <button className="topbarIconItem_admin" onClick={(e) => {e.preventDefault(); window.location.href='/admin_manage_user';}} onMouseEnter={turnOnBackground} onMouseLeave={turnOffBackground} >
                        <PeopleOutline color={'#ffffff'} background={'rgba(0, 0, 0, 0)'} height="30px" width="30px"/>
                    </button>
                    <button className="topbarIconItem_admin" onClick={(e) => {e.preventDefault(); window.location.href='/admin_manage_post';}} onMouseEnter={turnOnBackground} onMouseLeave={turnOffBackground}>
                        <ChatbubbleOutline color={'#555555'} background={'rgba(0, 0, 0, 0)'} height="30px" width="30px"/>
                    </button>
                </div>
            </div>
        </div>
                )}}

export default Topbar_admin