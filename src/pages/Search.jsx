import React, { useState, useEffect } from 'react';
import './search.css';
import Topbar from '../components/Topbar.jsx';
import { SearchOutline } from 'react-ionicons';
import Feed from '../components/Feed';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('tag');
  const [searchResults, setSearchResults] = useState(
    [
      {
          "_id": "6617460bb758fcf6a5c2ff7c",
          "username": "Ronald5678",
          "email": "ronald1234@gmail.com",
          "password": "$2b$10$MYooMJvFEQAylIPVcZTEOu1hiWIRHsV15zC6UasTc1GI/Sp1e7jXS",
          "profilePicture": "",
          "followers": [],
          "followings": [
              "6609753185abbcb4c20c6bde"
          ],
          "blockedUsers": [],
          "birthday": null,
          "isAdmin": false,
          "savedPosts": [],
          "isPublic": true,
          "suspended": false,
          "suspensionReason": "",
          "followRequests": [],
          "createdAt": "2024-04-11T02:08:11.967Z",
          "updatedAt": "2024-04-11T02:09:32.159Z",
          "__v": 0
      },
      {
          "_id": "6616cd985f07cf25b366718f",
          "username": "ronaldding",
          "email": "ronaldding2002@gmail.com",
          "password": "$2b$10$emmdeNjxH6C7vEM7KDPOvOLGzgsjIAech4kO/ylqa6Xo1fuJXcM0.",
          "profilePicture": "",
          "followers": [],
          "followings": [
              "661745adb758fcf6a5c2ff67"
          ],
          "blockedUsers": [],
          "birthday": null,
          "isAdmin": false,
          "savedPosts": [],
          "isPublic": true,
          "suspended": false,
          "suspensionReason": "",
          "followRequests": [],
          "createdAt": "2024-04-10T17:34:16.870Z",
          "updatedAt": "2024-04-11T02:59:36.222Z",
          "__v": 6
      },
      {
          "_id": "661745adb758fcf6a5c2ff67",
          "username": "ronaldding1114",
          "email": "ronaldding1114@gmail.com",
          "password": "$2b$10$KlWvUZsgQoj7Gnvf4xU7ouJLHwh2zxWtNjUlWGSkVcSTTwyvIAhC6",
          "profilePicture": "",
          "followers": [
              "6616cd985f07cf25b366718f"
          ],
          "followings": [],
          "blockedUsers": [],
          "birthday": null,
          "isAdmin": false,
          "savedPosts": [],
          "isPublic": true,
          "suspended": false,
          "suspensionReason": "",
          "followRequests": [],
          "createdAt": "2024-04-11T02:06:37.557Z",
          "updatedAt": "2024-04-11T02:59:36.218Z",
          "__v": 0
      }
  ]
  );
  const currentUserId = sessionStorage.getItem('userID');

  const fetchSearchResults = async () => {
    try {
      const response = await fetch(`http://localhost:8800/search/user?q=${searchTerm}`);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      fetchSearchResults();
    }
  }, [searchTerm]);

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchTypeChange = (type) => {
    setSearchType(type);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      setSearchType('none');
      setTimeout(() => {
        setSearchType('tag');
      }, 0);
    }
  };

  const handleFollowClick = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8800/user/${userId}`);
      const user = response.data;
      const isFollowing = user.followers.includes(currentUserId);

      if (isFollowing) {
        await axios.put(`http://localhost:8800/user/${userId}/unfollow`, {
          userId: currentUserId
        });
      } else {
        await axios.put(`http://localhost:8800/user/${userId}/follow`, {
          userId: currentUserId
        });
      }

      await fetchSearchResults();
    } catch (error) {
      console.error('An error occurred while making the follow request:', error);
      // Handle error if needed
    }
  };

  return (
    <div className="search">
      <Topbar />
      <div className="searchContainer">
        <div className="searchBar">
          <SearchOutline color={'#ffffff'} height="20px" width="20px" />
          <input
            type="text"
            className="searchInput"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchTermChange}
            onKeyPress={handleKeyPress}
          />
          <div className="searchButtons">
            <button
              className={`searchTypeButton ${searchType === 'tag' ? 'active' : ''}`}
              onClick={() => handleSearchTypeChange('tag')}
            >
              Tag
            </button>
            <button
              className={`searchTypeButton ${searchType === 'name' ? 'active' : ''}`}
              onClick={() => handleSearchTypeChange('name')}
            >
              Name/ID
            </button>
          </div>
        </div>
        {searchType === 'name' && (
          <div className="searchResults">
            {searchResults.length > 0 ? (
              searchResults.map((result) => (
                <Link to={`/profile/${result._id}`} key={result._id}>
                  <div className="searchResultItem">
                    <img src={`/assets/person/1.jpeg`} alt="Person" />
                    <span>{result.username}</span>
                    {/* <button className="followButton" onClick={() => handleFollowClick(result._id)}>
                      {result.isFollowing ? 'Following' : 'Follow'}
                    </button> */}
                    <button className="followButton">
                      Info
                    </button>
                  </div>
                </Link>
              ))
            ) : (
              <div className="noResultsMessage">No results found.</div>
            )}
          </div>
        )}
        {searchType === 'tag' && (
          <div className="searchResults">
            <Feed activeButton={'search'} tags={searchTerm}></Feed>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;