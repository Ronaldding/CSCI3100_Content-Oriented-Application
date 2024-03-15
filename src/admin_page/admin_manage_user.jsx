import Topbar_admin from '../components/topbar_admin.jsx'
import React, { Component } from 'react';
import '../pages/profile.css'

class Admin_manage_user extends React.Component {
    constructor(props) {
      super(props);
    }
      render() {
          return(
            <div className="profile">
                <Topbar_admin/>
            </div>
          )}}

export default Admin_manage_user