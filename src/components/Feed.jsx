import React, { Component, useState } from 'react';
import './feed.css';
import Post from './Post.jsx'

class Feed extends React.Component {

    render(){
        return(
            <div className="feed">
                <Post />
            </div>
        )
    }
} 

export default Feed;