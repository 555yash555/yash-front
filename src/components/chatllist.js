import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getChats } from '../actions/messageActions';
import { Link, useNavigate } from "react-router-dom";
import{getUserDetails} from '../actions/userActions'
import Loader from './Loader'; // Make sure to import your Loader component
import './chat.css';

const ChatList = ({ onSelectChat, onOpenMessageForm }) => {
  const dispatch = useDispatch();
  const { chats, error, loading } = useSelector((state) => state.chatreducer);
  const { user } = useSelector((state) => state.userDetails);

  React.useEffect(() => {
    dispatch(getChats());
  }, [dispatch]);

  const handleOpenMessageForm = (userId) => {
    onOpenMessageForm(userId);
  };

  const currentUserId = JSON.parse(localStorage.getItem('userInfo')).id;
  

  return (
    <div className="chat-list">
      <h2>Chats</h2>
      {loading ? (
        <Loader />
      ) : chats.length === 0 ? (
        <p className="chat-list-username"> No chats available. Search for friends to start a conversation!</p>
      ) : (
        <ul style={{paddingLeft:"0.5%"}}>
          {chats.map((chat) => {
            const otherUserId = chat.user_first === currentUserId ? chat.user_second : chat.user_first;
            console.log("username");
            console.log(chat.user_second.email);
            
            
            return (
              <li key={chat.chat_id} onClick={() => {onSelectChat(chat.chat_id,otherUserId)}}>
                <div className="chat-list-item">
                <Link
        to={`/app/user/${chat.user_second}/posts`}
        style={{ font: "inherit", textDecoration: "inherit" }} >
                   <div className="avatar">
      {chat.user_data_second.username[0].toUpperCase()}
    </div>
                  </Link>
                  <div className="chat-list-text">
                    <p className="chat-list-username">{chat.user_data_second.username}</p>
                    <p className="chat-list-last-message">Last message goes here...</p>
                  </div>
                  <div className="message-icon" onClick={() => handleOpenMessageForm(otherUserId)}></div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ChatList;