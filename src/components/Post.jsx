import React from 'react';
import './post.css';
import { EllipsisVertical, HeartOutline, ChatbubbleOutline, PaperPlaneOutline } from 'react-ionicons';

const Post = ({ props }) => {

  return (
    <div className="post">
      {props.map((post, index) => (
        <div className="postLoop">
          <div key={index} className="postTop">
            <div className="postTopLeft">
              <img className='postProfileImg' src="/assets/person/1.jpeg" alt="Profile"></img>
              <div className="postUserName">
                {post.userId}
              </div>
              <span className="postDate"> {post.date}</span>
            </div>
            <div className="postTopRight">
              <EllipsisVertical color={'#ffffff'} height="20px" width="20px" />
            </div>
          </div>
          <div className="postContent">
            <div className="postImage">
              <img className='postImage' src={post.photo} alt="Post"></img>
            </div>
            <div className="postText">
              {post.desc}
            </div>
          </div>
          <div className="postBottom">
            <div className="postBottomUpper">
              <div className="postBottomUpperItem">
                <HeartOutline color={'#ffffff'} height="25px" width="25px" />
              </div>
              <div className="postBottomUpperItem">
                <ChatbubbleOutline color={'#ffffff'} height="25px" width="25px" />
              </div>
              <div className="postBottomUpperItem">
                <PaperPlaneOutline color={'#ffffff'} height="25px" width="25px" />
              </div>
            </div>
            <div className="postBottomLower">
              {post.comment} comments, {post.like} likes
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Post;