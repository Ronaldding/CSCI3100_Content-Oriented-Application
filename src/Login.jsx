import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import login_background from './background3.jpg';
import './style.css';
import { PersonCircle, LockClosedOutline } from 'react-ionicons'

class Login extends React.Component {
    render(){
    return(
        <div style={{ backgroundImage: `url(${login_background})`, display: 'flex', alignItems: 'center',justifyContent: 'center', backgroundSize: 'cover',backgroundPosition: 'center', height: '100vh'}}>
            <div class="vh-100 d-flex align-items-center justify-content-center">
          <Login_block />
            </div>
        </div>
    )
    }}

class Login_block extends React.Component {
    constructor(props) {
        super(props);
    }

    async login_handleSubmit(event){
        event.preventDefault();
    }
    render() {
        return (
            <div className="login_container" style={{justifyContent: 'center', alignItems: 'center'}}>
                <div className='login_form'>
                    <h3 className='logo'>Login</h3>
                    <form onSubmit={this.login_handleSubmit} style={{display: 'flex', flexDirection: 'column'}}>
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
                        <button type='submit' className="button">Login</button>
                        <div className="register">
                            <p>Don't have an account? <a href="/signup" className="register_link">Register here</a></p>
                        </div>

                    </form>

                </div>

            </div>
        )}
}

export default Login;