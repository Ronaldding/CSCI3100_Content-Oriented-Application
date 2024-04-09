import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { BrowserRouter, Routes, Route, Switch, Link, useParams } from 'react-router-dom';
import Login from './Login.jsx'
import Home from './Home.jsx'
import Register_page from './Register_page.jsx'
import Profile from './pages/Profile.jsx'
import Search from './pages/Search.jsx'
import Explore from './pages/Explore.jsx'
import Saved from './pages/Saved.jsx'
import Notification from './pages/Notification.jsx'
import PostDetails from './pages/PostDetails.jsx'
import Admin_manage_user from './admin_page/admin_manage_user.jsx'
import Admin_manage_post from './admin_page/admin_manage_post.jsx'

class App extends React.Component {
    constructor(props) {
      super(props);
    }
      render() {
          return(
           <BrowserRouter>
              <div>
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route exact path="/login" element={<Login />} />
                  <Route exact path="/register" element={<Register_page />} />
                  <Route exact path="/profile/:id" element={<Profile />} />
                  <Route exact path="/search" element={<Search />} />
                  <Route exact path="/explore" element={<Explore />} />
                  <Route exact path="/saved" element={<Saved />} />
                  <Route exact path="/post/:id" element={<PostDetails />} />
                  <Route exact path="/admin_manage_user" element={<Admin_manage_user />} />
                  <Route exact path="/admin_manage_post" element={<Admin_manage_post />} />
                  <Route exact path="/notification" element={<Notification />} />
              </Routes>
              </div>
          </BrowserRouter>
          )
      }}

      ReactDOM.render(<App />, document.getElementById('app'));
//   const root = ReactDOM.createRoot(document.querySelector("#app"));
//   root.render(<App/>);