import React, { useState, useEffect } from 'react';
import './post.css';
import { EllipsisVertical, HeartOutline, ChatbubbleOutline, PaperPlaneOutline, Heart } from 'react-ionicons';
import axios from 'axios';
import './createpost.css';
import { ImagesOutline, CloseOutline } from 'react-ionicons';
import { useLocation, Link } from 'react-router-dom';

const Post = ({ post }) => {
  const currentUserId = '660970232846199a041ae117'; // Replace with the current user's ID
  const [currentUserLiked, setCurrentUserLiked] = useState(false);
  const [numLike, setNumLike] = useState(0);
  const [numComments, setNumComments] = useState(0);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [userSaved, setUserSaved] = useState(false);
  const [editPost, setEditPost] = useState(false);
  const [content, setContent] = useState(post.desc);
  const [postOwner, setPostOwner] = useState({
    "_id": "660970232846199a041ae117",
    "username": "Unknown User",
    "email": "unknown@unknown.com",
    "profilePicture": "",
    "followers": [],
    "followings": [],
    "blockedUsers": [],
    "birthday": null,
    "isAdmin": false,
    "savedPosts": [
        "660a8cdfe51dab7c9834cd1e",
        "660a8cdfe51dab7c9834cd1d",
        "660a8cdfe51dab7c9834cd1f"
    ],
    "isPublic": true,
    "suspended": false,
    "suspensionReason": "",
    "followRequests": [],
    "createdAt": "2024-03-31T14:16:03.992Z",
    "__v": 13
});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/user/${post.userId}`);
        setPostOwner(res.data);
        console.log("got post owner:");
        console.log(res);
        console.log(postOwner.username);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, [post.userId]);
  

  useEffect(() => {
    if (post.likes) {
      setCurrentUserLiked(post.likes.includes(currentUserId));
      setNumLike(post.likes.length);
    }

    if (post.comments) {
      setNumComments(post.comments.length);
    }
  }, [post, currentUserId]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/user/${currentUserId}`);
        setUser(res.data);
        console.log(res);
        if(user.savedPosts.includes(post._id)){
          setUserSaved(true);
        } else {
          setUserSaved(false);
        }
      } catch (error) {
        console.error(error);
      }
    };fetchUser();
  }, [currentUserId]);
  

  const handleMoreToggle = () => {
    setIsMoreOpen(!isMoreOpen);
  }

  const handleLike = async () => {
    try {
      const url = `http://localhost:8800/post/${post._id}/like`;
      const response = await axios.put(url, { userId: currentUserId });

      if (response.ok) {
        console.log(response.data); // Log the response if needed
      } else {
        console.error(response.data); // Log the error response if needed
      }

      if (currentUserLiked) {
        setCurrentUserLiked(false);
        setNumLike(numLike - 1);
      } else {
        setCurrentUserLiked(true);
        setNumLike(numLike + 1);
      }
    } catch (error) {
      console.error('An error occurred while making the follow request:', error);
      // Handle error if needed
    }
  };

  const handleComment = () => {
    // Handle comment functionality
  };

  const handleDelete = async () => {
    try {
      const url = `http://localhost:8800/post/${post._id}`;
      const response = await axios.delete(url, { data: { userId: currentUserId } });
    
      if (response.ok) {
        console.log(response.data); // Log the response if needed
      } else {
        console.error(response.data); // Log the error response if needed
      }
      setIsMoreOpen(false);
      window.location.reload();
      // Handle the state updates or other actions after successful deletion
    } catch (error) {
      console.error('An error occurred while making the delete request:', error);
      // Handle error if needed
    }
  };

  const handleEdit = async () => {
    setEditPost(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    post.desc = content;
    
    try {
      const response = await axios.put(`http://localhost:8800/post/${post._id}`, {
        userId: currentUserId,
        desc: content
      });
      
      // Handle the response as needed
      console.log(response.data);
      
      // Reset the form or close the popup after submission
      onClose();
      setIsMoreOpen(false);
      // window.location.reload();
    } catch (error) {
      // Handle error cases
      console.error(error);
    }
  };

  const handleShare = () => {
    // Display a popup indicating the post link has been copied
    const copyText = `http://localhost:3000/post/${post._id}`; // Replace with the actual post URL
    navigator.clipboard.writeText(copyText)
      .then(() => {
        // Clipboard write succeeded
        alert('Post link has been copied!');
      })
      .catch((error) => {
        // Clipboard write failed
        console.error('Failed to copy post link:', error);
      });
  };

  const handleSave = async () => {
    try {
      const url = `http://localhost:8800/post/${post._id}/save`;
  
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: currentUserId,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log(data); // Log the response if needed
      } else {
        console.error(data); // Log the error response if needed
      }
    } catch (error) {
      console.error('An error occurred while making the request:', error);
      // Handle error if needed
    }
    setIsMoreOpen(false);
    setUserSaved(!userSaved);
  };

  const onClose = () => {
    setEditPost(false);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  return (
    <div className="post">
      <div className="postLoop">
        <div className="postTop">
          <div className="postTopLeft">
            <img className="postProfileImg" src="/assets/person/1.jpeg" alt="Profile" />
            <Link to={`/profile/${post.userId}` } style={{ textDecoration: 'none', color: '#ffffff'}}>
              <div className="postUserName">{postOwner.username}</div>
            </Link>
            <span className="postDate">{post.date}</span>
          </div>
          <div className="postTopRight">
            <EllipsisVertical color={'#ffffff'} height="20px" width="20px" onClick={handleMoreToggle}/>
          </div>
          {isMoreOpen && (
            <ul className="moreList">
                <li>
                  <div className="moreItem" onClick={handleSave}>
                    {userSaved ?  "Unsave" : "Save"}
                  </div>
                </li>
                {post.userId === currentUserId && (
                  <li>
                      <div className="moreItem" onClick={handleEdit}>
                        Edit
                      </div>
                  </li>
                )}
                {post.userId === currentUserId && (
                  <li>
                      <div className="moreItem" onClick={handleDelete}>
                        Delete
                      </div>
                  </li>
                )}
            </ul>
          )}
        </div>
        <div className="postContent">
          {post.photo != null &&
            <div className="postImage">
              <img className="postImage" src={post.photo} alt="Post" />
            </div>
          }
          <div className="postText">{post.desc}</div>
        </div>
        <div className="postBottom">
          <div className="postBottomUpper">
            <button className="postBottomUpperItem" onClick={handleLike}>
              {currentUserLiked ? (
                <Heart color={'#ff0000'} height="25px" width="25px" />
              ) : (
                <HeartOutline color={'#ffffff'} height="25px" width="25px" />
              )}
            </button>
            <Link to={`/post/${post._id}`}>
              <button className="postBottomUpperItem" onClick={handleComment}>
                <ChatbubbleOutline color={'#ffffff'} height="25px" width="25px" />
              </button>
            </Link>
            <button className="postBottomUpperItem" onClick={handleShare}>
              <PaperPlaneOutline color={'#ffffff'} height="25px" width="25px" />
            </button>
          </div>
          <div className="postBottomLower">
            {numLike} {numLike === 1 ? 'like' : 'likes'}, {numComments}{' '}
            {numComments === 1 ? 'comment' : 'comments'}
          </div>
        </div>
      </div>
      {
        editPost && (
          <div className="createPostOverlay">
            <div className="createPostPopup">
              <form onSubmit={handleSubmit}>
                <button className="closeButton" onClick={onClose}>
                    <CloseOutline color="#ffffff" height="20px" width="20px" />
                </button>
                <textarea
                  value={content}
                  onChange={handleContentChange}
                >
                </textarea>
                <button className="postbtn" type="submit">Update</button>
              </form>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default Post;