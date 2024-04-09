import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import login_background from './background3.jpg';
import './style.css';
import { PersonCircle, LockClosedOutline } from 'react-ionicons'
import Cookies from 'js-cookie'


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
        this.Login = this.Login.bind(this)
        this.state = {show_message:false, message: "hello"}
    }


    Login =  async(event) =>{
        event.preventDefault();
        const login_username =  document.getElementById('login_username').value;
        const login_password =  document.getElementById('login_password').value;
        if(login_username == 'admin' && login_password == 'admin'){
            sessionStorage.setItem('admin', 'valid');
            window.location.href = 'http://localhost:3000/admin_manage_user'
        } else {
        const data ={
            username: login_username,
            password: login_password
          }
        const response = await fetch('http://localhost:8800/login', { 
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
                    this.setState({message: "Invalid username or password!"})
                    this.setState({show_message:true})
                    setTimeout(() => {
                        this.setState({ show_message: false });},3000)      
                } else if (list[0] == 200) {
                    const cookie_set = fetch(`http://localhost:8800/login/${login_username}`, {method: 'GET'})
                    .then(data => data.json())
                    .then(data =>    
                    {             
                        sessionStorage.setItem('userID', data._id);
                        window.location.href = 'http://localhost:3000/explore';
                    })
                    }
                    })}}
    render() {
        return (
            <div className="login_container" style={{justifyContent: 'center', alignItems: 'center'}}>
                <div className='login_form'>
                    <h3 className='logo'>Login</h3>
                    <form onSubmit={this.Login} style={{display: 'flex', flexDirection: 'column'}}>
                        <div className='input_container '>
                            <span class='icon'>
                            <PersonCircle color={'#ffffff'}   />
                            </span>
                            <input type='text' id='login_username' name='login_username' required/>
                            <label for='login_username'>Username</label>
                        </div>
                        <div className="input_container">
                            <span className="icon">
                                <LockClosedOutline color={'#ffffff'}  />
                            </span>
                            <input type="password" id='login_password' name='login_password' required/>
                            <label for='login_password'>Password</label>
                        </div>
                        {this.state.show_message &&<h5 id='message'>{this.state.message}</h5>}
                        <button type='submit' className="button">Login</button>
                        <div className="register" style={{justifyContent: 'center', alignContent: 'center', display: 'flex'}}>
                            <p>Don't have an account? <a href="/register" className="register_link">Register here</a></p>
                        </div>

                    </form>

                </div>

            </div>
        )}
}

export default Login;