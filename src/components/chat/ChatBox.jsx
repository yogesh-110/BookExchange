import React from 'react';
import UserSearch from './UserSearch';
import Chats from './Chats';

function ChatBox() {
  return (
    <div className="chatBox">
      <div className="title">Chat Box</div>
      <UserSearch />
      <Chats />
    </div>
  );
}

export default ChatBox;
