import Topbar_admin from '../components/topbar_admin.jsx'
import React, { Component } from 'react';
import './admin_managment_user.css'
import {Posts} from '../dummyData.js'

class Admin_manage_post extends React.Component {
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
                        <h3>Post managament</h3>
                        <div className="line"></div>
                    </div>
                    <div className='container'>
                        <div className="table_user">
                        <table className='table table-dark table-hover'>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>DATE</th>
                                <th>USER</th>
                                <th>DESCRIPTION</th>
                                <th>PHOTO</th>
                                <th>ACTION</th>
                            </tr>
                            </thead>
                            <tbody>
                            {Posts.map((post, index) => (
                            <tr>
                            <td style={{width: "5%"}}>{post.id}</td>
                            <td style={{width: "13%"}}>{post.date}</td>
                            <td style={{width: "10%"}}>{post.userId}</td>
                            <td style={{width: "32%"}}>{post.desc}</td>
                            <td style={{width: "20%"}}>
                                <img src= {post.photo} width= "90%"/>
                            </td>
                            <td style={{width: "20%"}}>
                                <button className='btn btn-primary'>Edit</button>
                                <button className='btn btn-info'>Hide</button>
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

export default Admin_manage_post