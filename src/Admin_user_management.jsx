import React, { Component } from 'react';
import './pages/profile.css'
import Topbar_admin from './components/topbar_admin.jsx'

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