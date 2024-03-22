import React, { useContext, useEffect, useState } from 'react';
import { MdFileUpload } from 'react-icons/md';
import UploadPostDialog from '../components/UploadPostDailog';
import { AuthContext } from '../contexts/AuthContext';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import BookCard from '../components/cards/BookCard';

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const [postedBooks, setPostedBooks] = useState([]);

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
        <div className="content-upload-btn" onClick={openDialog}>
          <MdFileUpload size={24} />
          Upload
        </div>
        <div className="HomeContainer">
          <h2>Uploaded Books</h2>
          <div className="BookContainer">
            {postedBooks.length > 0 ? (
              postedBooks.map((book) => <BookCard key={book.id} book={book} />)
            ) : (
              <p>No books uploaded yet</p>
            )}
          </div>
        </div>
      </div>
      <UploadPostDialog isOpen={isDialogOpen} onClose={closeUploadDialog} />
    </div>
  );
};

export default Profile;
