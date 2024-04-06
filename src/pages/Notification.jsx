import React, { useState, useEffect } from 'react';
import Topbar from '../components/Topbar.jsx';
import { SearchOutline } from 'react-ionicons';
import './search.css';
import axios from 'axios';

const Notification = () => {

  useEffect(() => {
    const fetchPosts = async () => {
      // const res = await axios.get("/posts/timeline/660be546672ccca5ae4cc0ee");
      // console.log(res)
      console.log("loading posts")
    }
    fetchPosts();
  }, []);

  return (
    <div className="notification">
      <Topbar />
    </div>
  );
};

export default Notification;