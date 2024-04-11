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
  const [searchResults, setSearchResults] = useState([]);
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
              Name/email
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