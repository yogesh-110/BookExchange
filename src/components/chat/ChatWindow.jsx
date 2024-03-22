import React, { useContext } from 'react';
import SendMessage from './SendMessage';
import Conversation from './Conversation';
import { ChatContext } from '../../contexts/ChatContext';

function ChatWindow() {
  const { data } = useContext(ChatContext);
  console.log(data);

  return (
    <div className="chatWindow">
      <div className="messageTitle">{data.user?.displayName}</div>
      <Conversation />
      <SendMessage />
      {/* {data.user === null ? (
        <>
        </>
      ) : (
        <div className="selectUser">
          <p>Select anyone to start chat</p>
        </div>
      )} */}
    </div>
  );
}

export default ChatWindow;
