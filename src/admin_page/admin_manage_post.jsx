import Topbar_admin from '../components/topbar_admin.jsx'
import React, { Component } from 'react';
import './admin_managment_user.css'
import './user.css'
import Popup from 'reactjs-popup';
import Cookies from 'js-cookie';


class Admin_manage_post extends React.Component {
    constructor(props) {
      super(props);
      this.state = {post_list:[], check: false}
      this.del_post = this.del_post.bind(this)
      this.hided_post = this.hided_post.bind(this)
      this.unhided_post = this.unhided_post.bind(this)
      this.Submit_Update = this.Submit_Update.bind(this)
    }

    componentDidMount() {
        this.post_info();
        let check = sessionStorage.getItem('admin')
        if(check == 'valid'){
            this.setState({check: true})
        }
        window.addEventListener('beforeunload', () => {
            sessionStorage.clear();
          });
    }

    
    post_info(){
        const post_infomation = fetch('http://localhost:8800/admin_manage_post', {method: 'GET'})
        .then((response => response.json()))
        .then((data =>{
            this.setState({ post_list: data }, () => {
                this.convert_date(); 
              }
            );
          }))
        .catch((err) => console.log(err))
        }
    
    del_post(id){
        const delete_post = fetch(`http://localhost:8800/admin_manage_post/${id}`, {method: 'DELETE'})
        .then(data => this.componentDidMount())
    }
    
    hided_post(id){
        const hided_post = fetch(`http://localhost:8800/admin_manage_post/${id}/hide`, {method: 'PUT'})
        .then(data => this.componentDidMount())
    }
    
    unhided_post(id){
        const unhided_post = fetch(`http://localhost:8800/admin_manage_post/${id}/unhide`, {method: 'PUT'})
        .then(data => this.componentDidMount())
    }

    convert_date(){
        let updated_post = [...this.state.post_list];
        updated_post.forEach((post,index) => {
            const timestamp = post.updatedAt;
            const date = new Date(timestamp);
            const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
            const dateTime = date.toLocaleString("en-US", options);
            updated_post[index].updatedAt = dateTime;
        })
        this.setState({post_list: updated_post})
    }

    Submit_Update = async(event,id) =>{
        event.preventDefault();
        const Desc = document.getElementById('Desc').value;
        const updatedAt =  document.getElementById('updatedAt').value;
        const createdAt =  document.getElementById('createdAt').value;
        const data ={
            desc: Desc,
            updatedAt: updatedAt,
            createdAt: createdAt
          }
        const response = await fetch(`http://localhost:8800/admin_manage_post/${id}`, { 
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
         })
         .then((response) => this.componentDidMount())
    }

    
      render() {
        if(this.state.check){
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
                                <th>USERNAME</th>
                                <th>UPDATED_AT</th>
                                <th>DESCRIPTION</th>
                                <th>MEDIA</th>
                                <th>ACTION</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.post_list.map((post, index) => (
                            <tr>
                            <td style={{width: "auto"}}>{post.username.username}</td>
                            <td style={{width: "auto"}}>{post.updatedAt}</td>
                            <td style={{width: "auto"}}>{post.desc}</td>
                            <td style={{width: "auto"}}>
                                {!post.video ? <img src= {post.img} width= "50%" height="50%"/> : <video width= "50%" height="50%"  controls><source src={post.video} type="video/mp4"/></video>}
                            </td>
                            <td style={{width: "auto"}}>
                                <div className='popup'>
                                <Popup trigger={<button className='btn btn-primary'>Edit</button>} onClose={()=>console.log("close")} modal>
                                    {close => <div className='popup_block'> 
                                       <div className="inner_block">
                                        <button className='close_button' onClick={close}>
                                            &times;
                                        </button>
                                        <h3 style={{fontWeight: "800"}}>Update form:</h3>
                                        <form id="post_update_form" onSubmit={event =>{this.Submit_Update(event, post._id);close()}}>
                                        <label for="Desc" style={{display: "inline-block",width: "100px",textAlign: "left"}}>Desc:</label>&nbsp;
                                        <textarea  type="text" id="Desc" name="Desc" defaultValue={post.desc}  required></textarea>&nbsp;
                                        <br/>
                                        <label for="createdAt" style={{display: "inline-block",width: "100px",textAlign: "right"}}>CreatedAt:</label>&nbsp;
                                        <input type="text" id="createdAt" name="createdAt" defaultValue={post.createdAt}  required></input>
                                        <br/>
                                        <label for="updatedAt" style={{display: "inline-block",width: "100px",textAlign: "right"}}>UpdatedAt:</label>&nbsp;
                                        <input type="text" id="updatedAt" name="updatedAt" defaultValue={new Date().toISOString()} disabled></input>
                                        <br/>
                                        <input type="submit" value="Submit" id="submit" ></input>
                                        </form>
                                        </div>
                                        </div>}
                                    </Popup>
                                {!post.isHide? (<button className='btn btn-warning' onClick={() => this.hided_post(post._id)}>Hide</button>): (<button className='btn btn-warning' onClick={() => this.unhided_post(post._id)}>Unhide</button>)}
                                <button className='btn btn-danger' onClick={() => this.del_post(post._id)}>Delete</button></div>
                            </td>
                            </tr>
                            ))}
                            </tbody>
                        </table>
                        </div>
                    </div>
                </div>
            </div>
        )} else {
            return(
                <h1>You have no permission to access this page!</h1>
            )
        }
    }}

export default Admin_manage_post