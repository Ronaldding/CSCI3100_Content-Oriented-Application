import './style.css';
import login_background from './background3.jpg';
import React, { Component } from 'react';

class Home extends React.Component {

    render(){
    return(
        <div style={{ backgroundImage: `url(${login_background})`, display: 'flex', alignItems: 'center',justifyContent: 'center', backgroundSize: 'cover',backgroundPosition: 'center', height: '100vh'}}>
            <div class="vh-100 d-flex align-items-center justify-content-center">
            <div className="home_container" style={{justifyContent: 'center', alignItems: 'center'}}>
                <div className='login_form'>
                    <div className='d-flex align-items-center justify-content-center' style={{alignSelf: 'center' }}>
                    <img src={require('./components/ChipichpiLogo.png')} height='200px' width = '200px'/>
                    </div>
                    <h3 className='logo_home'>Chipichipi</h3>
                    <form style={{display: 'flex', flexDirection: 'column'}}>
                        <div className='container' style={{display: 'flex'}}>
                            <button type='submit' className="button" style={{margin: '5px'}}><a href='/login' >Login</a></button>
                            <button type='submit' className="button" style={{margin: '5px'}}><a href='/register' >Register</a></button>
                        </div>
                    </form>
                </div>
            </div>
            </div>
        </div>
    )}}

export default Home;