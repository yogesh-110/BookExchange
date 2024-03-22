import React, { useContext, useEffect, useState } from 'react';
import Message from './Message';
import { ChatContext } from '../../contexts/ChatContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';

function Conversation() {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);
  console.log(data.chatId);

  useEffect(() => {
    // Only subscribe to messages if chatId is defined
    if (data.chatId) {
      const documentRef = doc(db, 'chats', data.chatId);
      const unsubscribe = onSnapshot(documentRef, (doc) => {
        if (doc.exists()) {
          const docData = doc.data();
          setMessages(docData.messages || []);
        } else {
          setMessages([]);
        }
      });

      return () => {
        unsubscribe(); // Cleanup function to unsubscribe when component unmounts
      };
    }
  }, [data.chatId]);
  return (
    <div className="conversation">
      {messages.length > 0 ? (
        messages.map((message) => (
          <Message key={message.id} message={message} />
        ))
      ) : (
        <p>No messages yet.</p>
      )}
    </div>
  );
}

export default Conversation;
