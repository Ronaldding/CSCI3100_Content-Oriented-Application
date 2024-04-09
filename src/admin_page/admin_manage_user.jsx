import Topbar_admin from '../components/topbar_admin.jsx'
import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import './admin_managment_user.css'
import {Users} from '../dummyData.js'
import './user.css'

class Admin_manage_user extends React.Component {
    constructor(props) {
      super(props);
      this.state = {user_list:[], edit_user: false}
      this.del_user = this.del_user.bind(this)
      this.suspend_user = this.suspend_user.bind(this)
      this.unsuspend_user = this.unsuspend_user.bind(this)
      this.Submit_Update = this.Submit_Update.bind(this)
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

    Submit_Update = async(event,id, user_password) =>{
        event.preventDefault();
        const Username = document.getElementById('Username').value;
        const Email =  document.getElementById('Email').value;
        const Password =  document.getElementById('Password').value;
        let data ={
            username: Username,
            email: Email,
          }
        if (user_password != Password){
            data['password'] =  Password;
        }

        const response = await fetch(`http://localhost:8800/admin_manage_user/${id}`, { 
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
         })
         .then((response) => {this.componentDidMount()})
         
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
                                <th>EMAIL</th>
                                <th>PASSWORD</th>
                                <th>ACTION</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.user_list.map((user, index) => (
                            <tr>
                            <td style={{width: "auto"}}>{user._id}</td>
                            <td style={{width: "auto"}}>{user.username}</td>
                            <td style={{width: "auto"}}>{user.email}</td>
                            <td style={{width: "auto"}}>{user.password}</td>
                            <td style={{width: "auto"}}>
                                <div className='popup'>
                                <Popup trigger={<button className='btn btn-primary'>Edit</button>} onClose={()=>console.log("close")} modal>
                                    {close => 
                                    <div className='popup_block'> 
                                       <div className="inner_block">
                                        <button className='close_button' onClick={close}>
                                            &times;
                                        </button>
                                        <h3 style={{fontWeight: "800"}}>Update form:</h3>
                                        <form id="user_update_form" onSubmit={event => {this.Submit_Update(event, user._id, user.password);close()}}>
                                        <label for="Username" style={{display: "inline-block",width: "100px",textAlign: "right"}}>Username:</label>&nbsp;
                                        <input type="text" id="Username" name="Username" defaultValue={user.username}  required></input>&nbsp;
                                        <br/>
                                        <label for="Email" style={{display: "inline-block",width: "100px",textAlign: "right"}}>Email:</label>&nbsp;
                                        <input type="text" id="Email" name="Email" defaultValue={user.email} required></input>
                                        <br/>
                                        <label for="Password" style={{display: "inline-block",width: "100px",textAlign: "right"}}>Password:</label>&nbsp;
                                        <input type="text" id="Password" name="Password" defaultValue={user.password}  required></input>
                                        <br/>
                                        <input type="submit" value="Submit" id="submit" ></input>
                                        </form>
                                        </div>
                                    </div>}
                                    </Popup>
                                {!user.suspended? (<button className='btn btn-warning' onClick={() => this.suspend_user(user._id)}>Suspend</button>): (<button className='btn btn-warning' onClick={() => this.unsuspend_user(user._id)}>Unsuspend</button>)}
                                <button className='btn btn-danger' onClick={() => this.del_user(user._id)}>Delete</button></div>
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