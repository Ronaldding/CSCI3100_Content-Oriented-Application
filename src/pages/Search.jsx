import React, { useState, useEffect } from 'react';
import './search.css';
import Topbar from '../components/Topbar.jsx';
import { SearchOutline } from 'react-ionicons';
import Feed from '../components/Feed';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('tag');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(`http://localhost:8800/search/user?q=${searchTerm}`);
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.log(error);
      }
    };

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

  const handleSearch = () => {
    console.log(`Searching ${searchType}: ${searchTerm}`);
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
            {searchResults.map((result) => (
              <div className="searchResultItem" key={result._id}>
                <img src={`assets/person/${result._id}.jpeg`} alt="Person" />
                <span>{result.username}</span>
                <button className="followButton">Follow</button>
              </div>
            ))}
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