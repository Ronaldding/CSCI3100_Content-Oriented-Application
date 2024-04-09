import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import login_background from './background3.jpg';
import './style.css';
import { PersonCircle, LockClosedOutline, MailOutline } from 'react-ionicons'
import Popup from 'reactjs-popup';
import './admin_page/user.css'

class Register_page extends React.Component {
    render(){
    return(
        <div style={{ backgroundImage: `url(${login_background})`, display: 'flex', alignItems: 'center',justifyContent: 'center', backgroundSize: 'cover',backgroundPosition: 'center', height: '100vh'}}>
        <div class="vh-100 d-flex align-items-center justify-content-center">
            <Register_block />
        </div>
    </div>
    )}
}

class Register_block extends React.Component {
    constructor(props) {
        super(props);
        this.state = {show_message:false, message: "hello"}
        this.Register = this.Register.bind(this)
    }

    Register =  async(event) =>{
        event.preventDefault();
        const register_email = document.getElementById('register_email').value;
        const register_username =  document.getElementById('register_username').value;
        const register_password =  document.getElementById('register_password').value;
        const data ={
            username: register_username,
            email: register_email,
            password: register_password
          }
          console.log(data)
        const response = await fetch('http://localhost:8800/register', { 
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
         })
         .then(response => {
            const status = response.status;
            return response.json().then(parsed => [status, parsed]);
          })
         .then(list => 
            {
                if(list[0] == 400){
                    let message = list[1].message;
                    this.setState({message: message})
                    this.setState({show_message:true})
                    setTimeout(() => {
                        this.setState({ show_message: false });},3000)      
                } else if (list[0] == 200) {
                    let message = "Register successful!"
                    this.setState({message: message})
                    this.setState({show_message:true})
                    setTimeout(() => {
                        this.setState({ show_message: false });},3000)
                        setTimeout(() => {
                            window.location.href = 'http://localhost:3000/login';
                          }, 3000);
                }
            })
    }
    render() {
        return (
            <div className="register_container" style={{justifyContent: 'center', alignItems: 'center'}}>
                <div className='register_form'>
                    <h3 className='logo'>Register</h3>
                    <form onSubmit={this.Register} style={{display: 'flex', flexDirection: 'column'}}>
                        <div className="input_container">
                            <span className="icon">
                                <MailOutline color={'#ffffff'}  />
                            </span>
                            <input type="email" id="register_email" name="register_email" required/>
                            <label for="register_email">Email</label>
                        </div>
                        <div className='input_container '>
                            <span class='icon'>
                            <PersonCircle color={'#ffffff'}   />
                            </span>
                            <input type='text' id='register_username' name="register_username" required/>
                            <label for="register_username">Username</label>
                        </div>
                        <div className="input_container">
                            <span className="icon">
                                <LockClosedOutline color={'#ffffff'}  />
                            </span>
                            <input type="password" id='register_password' name='register_password' required/>
                            <label for="register_password">Password</label>
                        </div>
                        {this.state.show_message &&<h5 id='message'>{this.state.message}</h5>}
                        <button type='submit' className="button">Register</button>
                        <div className="register" style={{justifyContent: 'center', alignContent: 'center', display: 'flex'}}>
                            <p>Already have an account? <a href="/login" className="register_link">Login</a></p>
                        </div>

                    </form>

                </div>

            </div>
            
        )}
}

export default Register_page;