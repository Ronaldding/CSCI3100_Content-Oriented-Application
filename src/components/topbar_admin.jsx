import ReactDOM from 'react-dom/client';
import React, { Component, useState } from 'react';
import './topbar.css'
import { Home, HomeOutline, Search, SearchOutline, Create, CreateOutline, Heart, HeartOutline, Person, PersonOutline, Menu} from 'react-ionicons'
import ChipichpiLogo from './ChipichpiLogo.png';

class Topbar_admin extends React.Component {
    render(){
    return(
        <div className="topbarContainer">
            <div className="topbarLeft">
                <a href='/' >
                    <button className="topbarLogo" style={{ backgroundImage: `url(${ChipichpiLogo})`, display: 'flex', alignItems: 'center',justifyContent: 'center', backgroundSize: 'cover',backgroundPosition: 'center', height: '40px'}}></button>
                </a> </div>
        </div>)}}

export default Topbar_admin