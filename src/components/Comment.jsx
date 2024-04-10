import React, { useState, useEffect } from 'react';
import './comment.css';
import { EllipsisVertical, HeartOutline, ChatbubbleOutline, PaperPlaneOutline } from 'react-ionicons';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Comment = ({ post }) => {
  const { id } = useParams();
  const currentUserId = sessionStorage.getItem('userID');
  // const currentUserId = '660970232846199a041ae117'; 
  const [postContent, setPostContent] = useState([]);
  const [replyText, setReplyText] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/post/${id}`);
        setPostContent(res.data);
        console.log(res);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, []); // Added an empty dependency array

  if (!postContent.comments || postContent.comments.length === 0) {
    return null; // Render nothing if post are not provided or empty
  }

  return (
    <div>
      {postContent.comments.map((comment) => (
        <div className="commentContainer" key={comment.id}>
          <div className="comment">
            <div className="commentTop">
              <div className="commentTopLeft">
                <img className="commentProfileImg" src="/assets/person/1.jpeg" alt="Profile" />
                <div className="commentUserName">{comment.userId}</div>
                <span className="commentDate">{comment.date}</span>
              </div>
              {/* <div className="commentTopRight">
                <EllipsisVertical color={'#ffffff'} height="20px" width="20px" />
              </div> */}
            </div>
            <div className="commentContent">
              <div className="commentText">{comment.comment}</div>
            </div>
            {/* <div className="commentBottom">
              <div className="commentBottomUpper">
                <div className="commentBottomUpperItem">
                  <HeartOutline color={'#ffffff'} height="25px" width="25px" />
                </div>
                <div className="commentBottomUpperItem">
                  <ChatbubbleOutline color={'#ffffff'} height="25px" width="25px" />
                </div>
                <div className="commentBottomUpperItem">
                  <PaperPlaneOutline color={'#ffffff'} height="25px" width="25px" />
                </div>
              </div>
            </div> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comment;