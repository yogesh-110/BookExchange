import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SendBookRequestDailog from '../SendBookRequestDailog';

function BookCard({ book, requestedBook }) {
  const navigate = useNavigate();
console.log("fsdfsdf",book)
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeUploadDialog = () => {
    setIsDialogOpen(false);
  };

  const handleBookClick = () => {
    if (requestedBook) {
      openDialog();
    } else {
      navigate(`/book/${book.id}`, { state: { book } });
    }
  };

  return (
    <>
      <div className="product" onClick={handleBookClick}>
        <img src={book.postUrl} alt="Book" className="product-image" />
        <div className="product-details">
          <h2 className="product-title">{book.bookName}</h2>
          <p className="product-author">{book.author}</p>
          <p className="product-category">{book.category}</p>
        </div>
      </div>
      {requestedBook && (
        <SendBookRequestDailog
          isOpen={isDialogOpen}
          onClose={closeUploadDialog}
          requestedBook={requestedBook}
          selectedBook={book}
        />
      )}
    </>
  );
}

export default BookCard;
