import React, { useState } from 'react';
import './search.css';
import Topbar from '../components/Topbar.jsx';
import { SearchOutline } from 'react-ionicons';
import Feed from '../components/Feed';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('tag'); // Default search type is 'tag'
  const [previousSearchType, setPreviousSearchType] = useState('tag');

  // Function to handle search term input change
  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Function to handle search type change
  const handleSearchTypeChange = (type) => {
    setPreviousSearchType(searchType);
    setSearchType(type);
  };

  // Function to handle "Enter" key press in the text area
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      setSearchType('none');
      setTimeout(() => {
        setSearchType(previousSearchType);
      }, 0);
    }
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

  // http://localhost:8800/post/search/tags?tags=123

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
            onKeyPress={handleKeyPress} // Add key press event handler
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
              <div className="searchResultItem" key={result.id}>
                <img src={`assets/person/${result.id}.jpeg`} alt="Person" />
                <span>{result.name}</span>
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