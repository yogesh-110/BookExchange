import React from 'react';
import ChatBox from '../components/chat/ChatBox';
import ChatWindow from '../components/chat/ChatWindow';

function Messages() {
  return (
    <div className="messageContainer">
      <div className="messageWrapper">
        <ChatBox />
        <ChatWindow />
      </div>
    </div>
  );
}

export default Messages;
