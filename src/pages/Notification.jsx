import React, { useState, useEffect } from 'react';
import Topbar from '../components/Topbar.jsx';
import { SearchOutline } from 'react-ionicons';
import './search.css';
import axios from 'axios';

const Notification = () => {
  const [userDetails, setUserDetails] = useState(null);
  const currentUserId = '660970232846199a041ae117'; // Replace with the current user's ID

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get("http://localhost:8800/contentExplore");
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