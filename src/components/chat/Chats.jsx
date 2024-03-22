import React, { useContext, useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import { AuthContext } from '../../contexts/AuthContext';
import { ChatContext } from '../../contexts/ChatContext';
import default_img from '../../assets/img/default_profile.png';

function Chats() {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsubscribe = onSnapshot(
        doc(db, 'userChats', currentUser.uid),
        (doc) => {
          setChats(Object.entries(doc.data()));
        }
      );
      return () => unsubscribe();
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: 'CHANGE_USER', payload: u });
  };

  return (
    <div className="chats">
      {chats
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <div
            className="userChat"
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userId)}
          >
            <img
              src={chat[1].userId.photoURL}
              alt="user avatar"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = default_img;
              }}
            />
            <div className="userChatInfo">
              <span>{chat[1].userId.displayName}</span>
              <p>{chat[1].lastMessage?.text}</p>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Chats;
