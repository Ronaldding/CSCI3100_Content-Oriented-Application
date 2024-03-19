import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import login_background from './background3.jpg';
import './style.css';
import { PersonCircle, LockClosedOutline, MailOutline } from 'react-ionicons'

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
    }

    async login_handleSubmit(event){
        event.preventDefault();
    }
    render() {
        return (
            <div className="register_container" style={{justifyContent: 'center', alignItems: 'center'}}>
                <div className='register_form'>
                    <h3 className='logo'>Register</h3>
                    <form onSubmit={this.login_handleSubmit} style={{display: 'flex', flexDirection: 'column'}}>
                        <div className="input_container">
                            <span className="icon">
                                <MailOutline color={'#ffffff'}  />
                            </span>
                            <input type="email" required/>
                            <label>Email</label>
                        </div>
                        <div className='input_container '>
                            <span class='icon'>
                            <PersonCircle color={'#ffffff'}   />
                            </span>
                            <input type='text' id='login_username' required/>
                            <label>Username</label>
                        </div>
                        <div className="input_container">
                            <span className="icon">
                                <LockClosedOutline color={'#ffffff'}  />
                            </span>
                            <input type="password" required/>
                            <label>Password</label>
                        </div>
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