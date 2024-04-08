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
        const email = document.getElementById('email').value;
        const login_username =  document.getElementById('login_username').value;
        const password =  document.getElementById('password').value;
        const data ={
            username: login_username,
            email: email,
            password: password
          }
          console.log(data)
        const response = await fetch(`http://localhost:8800/register`, { 
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
         })
         .then(response => 
            {
                if(response.status == 400){
                    let message = response.message;
                    console.log(message)
                    this.setState({show_message:true})
                    setTimeout(() => {
                        this.setState({ show_message: false });},5000)
                    this.setState({message: message})
                } else if (response.status == 200) {
                    let message = "Register successful!"
                    console.log(message)
                    this.setState({show_message:true})
                    this.setState({message: message})
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
                            <input type="email" id="email" name="email" required/>
                            <label for="email">Email</label>
                        </div>
                        <div className='input_container '>
                            <span class='icon'>
                            <PersonCircle color={'#ffffff'}   />
                            </span>
                            <input type='text' id='login_username' name="login_username" required/>
                            <label for="login_username">Username</label>
                        </div>
                        <div className="input_container">
                            <span className="icon">
                                <LockClosedOutline color={'#ffffff'}  />
                            </span>
                            <input type="password" id='password' name='password' required/>
                            <label for="password">Password</label>
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