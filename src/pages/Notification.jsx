import React, { useState, useEffect } from 'react';
import Topbar from '../components/Topbar.jsx';
import { SearchOutline } from 'react-ionicons';
import './search.css';
import axios from 'axios';

const Notification = () => {
  const [userDetails, setUserDetails] = useState(null);
  const currentUserId = sessionStorage.getItem('userID');
  // const currentUserId = '660970232846199a041ae117'; 

  useEffect(() => {
    const fetchUser = async () => {
      // const res = await axios.get(`http://localhost:8800/post/all/timeline`);
      const res = await axios.get(`http://localhost:8800/notification/${currentUserId}`);
      setUserDetails(res.data); // Store the JSON data in the state variable
    }
    fetchUser();
  }, []);

  return (
    <div className="notification">
      <Topbar />
      {userDetails && (
        <div>
          {userDetails && (
            <div>
              <h2>Your notification will be shown here:</h2>
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