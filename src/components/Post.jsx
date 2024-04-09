import React from 'react';
import './post.css';
import { EllipsisVertical, HeartOutline, ChatbubbleOutline, PaperPlaneOutline, Heart } from 'react-ionicons';

const Post = ({ post }) => {
  const currentUserId = '660970232846199a041ae117'; // Replace with the current user's ID

  const handleLike = () => {
    // Implement logic for liking/unliking the post
  };

  const handleComment = () => {
    // Implement logic for adding a comment to the post
  };

  const handleShare = () => {
    // Implement logic for sharing the post
  };

  return (
    <div className="post">
      <div className="postLoop">
        <div className="postTop">
          <div className="postTopLeft">
            <img className="postProfileImg" src="/assets/person/1.jpeg" alt="Profile" />
            <div className="postUserName">{post.username}</div>
            <span className="postDate">{post.date}</span>
          </div>
          <div className="postTopRight">
            <EllipsisVertical color={'#ffffff'} height="20px" width="20px" />
          </div>
        </div>
        <div className="postContent">
          <div className="postImage">
            <img className="postImage" src={post.photo} alt="Post" />
          </div>
          <div className="postText">{post.desc}</div>
        </div>
        <div className="postBottom">
          <div className="postBottomUpper">
            <button className="postBottomUpperItem" onClick={handleLike}>
              {post.likes.includes(currentUserId) ? (
                <Heart color={'#ff0000'} height="25px" width="25px" />
              ) : (
                <HeartOutline color={'#ffffff'} height="25px" width="25px" />
              )}
            </button>
            <button className="postBottomUpperItem" onClick={handleComment}>
              <ChatbubbleOutline color={'#ffffff'} height="25px" width="25px" />
            </button>
            <button className="postBottomUpperItem" onClick={handleShare}>
              <PaperPlaneOutline color={'#ffffff'} height="25px" width="25px" />
            </button>
          </div>
          <div className="postBottomLower">
            {post.likes.length} {post.likes.length === 1 ? 'like' : 'likes'}, {post.comments.length}{' '}
            {post.comments.length === 1 ? 'comment' : 'comments'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;