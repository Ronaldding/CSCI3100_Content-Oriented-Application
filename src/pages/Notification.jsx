import React, { useState, useEffect } from 'react';
import Topbar from '../components/Topbar.jsx';
import { SearchOutline } from 'react-ionicons';
import './search.css';
import axios from 'axios';

const Notification = () => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get("http://localhost:8800/admin_manage_user/660970232846199a041ae117");
      setUserDetails(res.data); // Store the JSON data in the state variable
    }
    fetchUser();
  }, []);

  return (
    <div className="notification">
      <Topbar />
      {userDetails && (
        <div>
          <h2>User Details:</h2>
          <p>ID: {userDetails._id}</p>
          <p>Username: {userDetails.username}</p>
          <p>Email: {userDetails.email}</p>
          <p>Number of Followers: {userDetails.followers.length}</p>
          <p>Number of Followings: {userDetails.followings.length}</p>
          {userDetails && (
            <div>
              <h2>User Details:</h2>
              <ul>
                {Object.entries(userDetails).map(([key, value]) => (
                  <li key={key}>
                    <strong>{key}: </strong>
                    {typeof value === 'object' ? JSON.stringify(value) : value}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Notification;