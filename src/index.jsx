import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { BrowserRouter, Routes, Route, Switch, Link, useParams } from 'react-router-dom';
import Login from './Login.jsx'
import Home from './Home.jsx'
import Register_page from './Register_page.jsx'
import Admin_user_management from './Admin_user_management.jsx'
import Profile from './pages/Profile.jsx'
import Search from './pages/Search.jsx'
import Explore from './pages/Explore.jsx'
import Saved from './pages/Saved.jsx'
import PostDetails from './pages/PostDetails.jsx'
import Admin_manage_user from './admin_page/admin_manage_user.jsx'

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
                  <Route exact path="/profile" element={<Profile />} />
                  <Route exact path="/search" element={<Search />} />
                  <Route exact path="/admin_user" element={<Admin_user_management />} />
                  <Route exact path="/explore" element={<Explore />} />
                  <Route exact path="/saved" element={<Saved />} />
                  <Route exact path="/post" element={<PostDetails />} />
                  <Route exact path="/admin_manage_user" element={<Admin_manage_user />} />
              </Routes>
              </div>
          </BrowserRouter>
  
          )
      }}

  
  const root = ReactDOM.createRoot(document.querySelector("#app"));
  root.render(<App/>);