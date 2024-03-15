import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import './search.css'
import Topbar from '../components/Topbar.jsx'
import { SearchOutline } from 'react-ionicons'


class Search extends React.Component {
    render(){
    return(
        <div className="search">
            <Topbar />
            <div className="searchContainer">
                <div className="searchBar">
                    <SearchOutline color={'#ffffff'} height="20px" width="20px"/>
                    <div className="searchText">
                        Search
                    </div>
                </div>
            </div>
        </div>
    )
    }}

export default Search;