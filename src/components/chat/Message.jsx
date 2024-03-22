import React, { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { ChatContext } from '../../contexts/ChatContext';

function Message({ message }) {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const [messageTime, setMessageTime] = useState('');

  const ref = useRef();

  useEffect(() => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  }, [message]);

  useEffect(() => {
    // Convert Firestore Timestamp to JavaScript Date
    const timestamp = message.date.toDate();

    // Format time using toLocaleTimeString method
    setMessageTime(
      timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    );
  }, [message.date]);

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && 'owner'}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt="userProfile"
        />
        <div className="messageTimestamp">{messageTime}</div>
      </div>
      <div className="messageContent">
        <p className="messageText">{message.text}</p>
        {message.image && <img src={message.image} alt="sendImage" />}
      </div>
    </div>
  );
}

export default Message;
