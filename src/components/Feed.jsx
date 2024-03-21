import React, { Component, useState } from 'react';
import './feed.css';
import Post from './Post.jsx'
import {Posts} from '../dummyData.js'

class Feed extends React.Component {
    render(){
        return(
            <div className="feed">
                <Post props={Posts}/>
            </div>
        )
    }
} 

export default Feed;