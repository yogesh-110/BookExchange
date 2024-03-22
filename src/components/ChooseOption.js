import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import BookCard from '../components/cards/BookCard';
import { useLocation } from 'react-router-dom';
import { MdFileUpload } from 'react-icons/md';
import UploadPostDialog from './UploadPostDailog';

const ChooseOption = () => {
  const { currentUser } = useContext(AuthContext);
  const [postedBooks, setPostedBooks] = useState([]);
  const location = useLocation();
  const { requestedBook } = location.state;

  console.log(requestedBook);

  useEffect(() => {
    const getPostedBooks = () => {
      const postRef = collection(db, 'books');
      const q = query(postRef, where('postedUserId', '==', currentUser.uid));
      onSnapshot(q, (snapshot) => {
        const pos = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPostedBooks(pos);
      });

      return () => {
        setPostedBooks([]);
      };
    };

    currentUser.uid && getPostedBooks();
  }, [currentUser.uid]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeUploadDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="profileContainer">
      <div className="profile-wrapper">
        <div className="HomeContainer">
          <h2>Select Book for Exchange</h2>
          <h3>Your bookshelf</h3>
          <div className="BookContainer">
            {postedBooks.length > 0 ? (
              postedBooks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  requestedBook={requestedBook}
                />
              ))
            ) : (
              <>
                <p>
                  No books uploaded yet, upload at least a book to exchange{' '}
                </p>
                <div className="content-upload-btn" onClick={openDialog}>
                  <MdFileUpload size={24} />
                  Upload
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <UploadPostDialog isOpen={isDialogOpen} onClose={closeUploadDialog} />
    </div>
  );
};

export default ChooseOption;
