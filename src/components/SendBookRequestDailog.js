import React, { useContext, useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Timestamp,
  arrayUnion,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase';
import { v4 as uuid } from 'uuid';
import { ChatContext } from '../contexts/ChatContext';
import { getUser } from '../helpers/shared';

function SendBookRequestDialog({
  isOpen,
  onClose,
  requestedBook,
  selectedBook,
}) {
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  const [postedUser, setPostedUser] = useState(null);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const defaultMessage = `Hi ${requestedBook.postedUser}, I want to exchange your '${requestedBook.bookName}' with my '${selectedBook.bookName}', it is an amazing book written by ${selectedBook.author}. Please let me know if you are interested. Thanks!`;
    setMessage(defaultMessage);

    const fetchPostedUser = async () => {
      try {
        getUser(requestedBook.postedUserId).then((user) => {
          setPostedUser(user);
        });
      } catch (error) {
        console.log('Error getting document:', error);
      }
    };
    fetchPostedUser();
  }, [requestedBook, selectedBook]);

  console.log(requestedBook);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsLoading(true)
      // Create or update the chat
      const combinedId =
        currentUser.uid > requestedBook.postedUserId
          ? currentUser.uid + requestedBook.postedUserId
          : requestedBook.postedUserId + currentUser.uid;

      const res = await getDoc(doc(db, 'chats', combinedId));

      // create chat if it doesn't exist
      if (!res.exists()) {
        await setDoc(doc(db, 'chats', combinedId), {
          messages: [],
        });

        // create user chats
        await updateDoc(doc(db, 'userChats', currentUser.uid), {
          [combinedId + '.userId']: {
            uid: requestedBook.postedUserId,
            displayName: postedUser.displayName,
            photoURL: postedUser.photoURL,
          },
          [combinedId + '.date']: serverTimestamp(),
        });
        await updateDoc(doc(db, 'userChats', requestedBook.postedUserId), {
          [combinedId + '.userId']: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + '.date']: serverTimestamp(),
        });
      }

      // Dispatch action to update the chat with default message

      // await updateDoc(doc(db, 'chats', combinedId), {
      //   messages: [
      //     {
      //       senderId: currentUser.uid,
      //       text: message,
      //       timestamp: serverTimestamp(),
      //     },
      //   ],
      // });

      await updateDoc(doc(db, 'chats', combinedId), {
        messages: arrayUnion({
          id: uuid(),
          text: message,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });

      await updateDoc(doc(db, 'userChats', currentUser.uid), {
        [combinedId + '.lastMessage']: {
          text: message,
        },
        [combinedId + '.date']: serverTimestamp(),
      });
      await updateDoc(doc(db, 'userChats', postedUser.uid), {
        [combinedId + '.lastMessage']: {
          text: message,
        },
        [combinedId + '.date']: serverTimestamp(),
      });

      dispatch({
        type: 'UPDATE_CHAT',
        payload: {
          chatId: combinedId,
          currentUser: currentUser,
          user: postedUser,
        },
      });

      // Navigate to messages page
      navigate(`/messages`);
    } catch (error) {
      toast.error('Failed to send book request');
    }
    setIsLoading(false)
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="dialogContainer">
      <div className="dialogWrapper">
        <Dialog.Panel className="dialog-panel">
          <Dialog.Title as="h3" className="title">
            Send Book Request
          </Dialog.Title>

          <form onSubmit={handleSubmit}>
            <textarea
              placeholder="Enter your message..."
              className="message-input"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div className="btn-collection">
              <button type="button" className="cancel" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="confirm">
                {isLoading ? "Loading...":"Send" }
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default SendBookRequestDialog;
