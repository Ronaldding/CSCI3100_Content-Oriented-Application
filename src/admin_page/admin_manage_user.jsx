import Topbar_admin from '../components/topbar_admin.jsx'
import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './admin_managment_user.css'
import {Users} from '../dummyData.js'

class Admin_manage_user extends React.Component {
    constructor(props) {
      super(props);
      this.state = {user_list:[]}
      this.del_user = this.del_user.bind(this)
      this.suspend_user = this.suspend_user.bind(this)
      this.unsuspend_user = this.unsuspend_user.bind(this)
      this.update_user = this.update_user.bind(this)
    }
    componentDidMount() {
        this.user_info();
    }

    user_info(){
        const user_infomation = fetch('http://localhost:8800/admin_manage_user', {method: 'GET'})
        .then((response => response.json()))
        .then((data =>{
            this.setState({user_list: data})
            console.log(data)
          }))
        .catch((err) => console.log(err))
        }
    
    del_user(id){
        const delete_user = fetch(`http://localhost:8800/admin_manage_user/${id}`, {method: 'DELETE'})
        .then(data => this.componentDidMount())
    }

    suspend_user(id){
        const susp_user = fetch(`http://localhost:8800/admin_manage_user/${id}/suspend`, {method: 'PUT'})
        .then(data => this.componentDidMount())
    }

    unsuspend_user(id){
        const unsusp_user = fetch(`http://localhost:8800/admin_manage_user/${id}/unsuspend`, {method: 'PUT'})
        .then(data => this.componentDidMount())
    }

    update_user(){
        <Popup trigger={<button> Trigger</button>} position="right center">
            <div>Popup content here !!</div>
        </Popup>
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
                            {this.state.user_list.map((user, index) => (
                            <tr>
                            <td style={{width: "15%"}}>{user._id}</td>
                            <td style={{width: "55%"}}>{user.username}</td>
                            <td style={{width: "30%"}}>
                                <Popup trigger={<button className='btn btn-primary' >Edit</button>} modal nested>
                                    {close => (
                                    <div className="modal">
                                        <button className="close" onClick={close}>
                                            &time;
                                        </button>
                                        <div className="title">
                                            <h4>Update user:</h4>
                                        </div>
                                        <div className="block">
                                            <h4>Update user:</h4>
                                        </div>
                                    </div>
                                    )}
                                </Popup>
                                {!user.suspended? (<button className='btn btn-warning' onClick={() => this.suspend_user(user._id)}>Suspend</button>): (<button className='btn btn-warning' onClick={() => this.unsuspend_user(user._id)}>Unsuspend</button>)}
                                <button className='btn btn-danger' onClick={() => this.del_user(user._id)}>Delete</button>
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