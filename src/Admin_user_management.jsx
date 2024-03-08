import React, { Component } from 'react';
import './profile.css'
import Topbar_admin from './components/Topbar.jsx'

class Admin_user_management extends React.Component {
    constructor(props) {
      super(props);
    }
      render() {
          return(
            <div className="profile">
                <Topbar_admin/>
            </div>
          )}}

export default Admin_user_management