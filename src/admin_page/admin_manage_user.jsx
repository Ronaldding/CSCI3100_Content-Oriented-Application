import Topbar_admin from '../components/topbar_admin.jsx'
import React, { Component } from 'react';
import './admin_managment_user.css'
import {Users} from '../dummyData.js'

class Admin_manage_user extends React.Component {
    constructor(props) {
      super(props);
    }
      render() {
          return(
            <div className="back">
                <div>
                    <Topbar_admin/>
                </div>
                <div className='block'>
                    <div className='title'>
                        <h3>User managament</h3>
                        <div className="line"></div>
                    </div>
                    <div className='container'>
                        <div className="table_user">
                        <table className='table table-dark table-hover'>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>USERNAME</th>
                                <th>ACTION</th>
                            </tr>
                            </thead>
                            <tbody>
                            {Users.map((user, index) => (
                            <tr>
                            <td style={{width: "15%"}}>{user.id}</td>
                            <td style={{width: "55%"}}>{user.username}</td>
                            <td style={{width: "30%"}}>
                                <button className='btn btn-primary'>Edit</button>
                                <button className='btn btn-warning'>Suspend</button>
                                <button className='btn btn-danger'>Delete</button>
                            </td>
                            </tr>
                            ))}
                            </tbody>
                        </table>
                        </div>
                    </div>
                </div>
            </div>
          )}}

export default Admin_manage_user