import React, { useState } from 'react';
import './search.css';
import Topbar from '../components/Topbar.jsx';
import { SearchOutline } from 'react-ionicons';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('tag'); // Default search type is 'tag'

  // Function to handle search term input change
  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Function to handle search type change
  const handleSearchTypeChange = (type) => {
    setSearchType(type);
  };

  // Function to handle search
  const handleSearch = () => {
    // Perform search based on searchType and searchTerm
    // Replace the following console.log with your search logic
    console.log(`Searching ${searchType}: ${searchTerm}`);
  };

  // Demo search results
  const searchResults = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Alice Johnson' },
  ];

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
        <div className="searchResults">
          {searchResults.map((result) => (
            <div className="searchResultItem" key={result.id}>
              <img src={`assets/person/${result.id}.jpeg`} alt="Person" />
              <span>{result.name}</span>
              <button className="followButton">Follow</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;