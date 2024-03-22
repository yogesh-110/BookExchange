import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { toast } from 'react-toastify';

function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({
    bookName: '',
    category: '',
    author: '',
    publication: '',
    description: '',
    postUrl: '',
  });

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const bookDoc = await getDoc(doc(db, 'books', id));
        if (bookDoc.exists()) {
          setBook(bookDoc.data());
        } else {
          console.error('Book not found');
        }
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    fetchBookDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, 'books', id), book);
      toast.success('Book updated successfully');
      navigate(`/profile`);
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  const handleCancel = () => {
    navigate(`/profile`);
  };

  return (
    <div className="HomeContainer">
      <h1>Edit Book</h1>
      <form onSubmit={handleSubmit}>
        <div className="BookDetails">
          <img className="BookImage" src={book.postUrl} alt="Book" />
          <div className="BookDetails-info">
            <div className="bookInfo-edit">
              <input
                type="text"
                name="bookName"
                value={book.bookName}
                onChange={handleChange}
                required
              />
              <select
                id="select-category"
                value={book.category}
                onChange={handleChange}
                name="category" // Added name attribute
                required
              >
                <option value="" disabled hidden>
                  Category
                </option>
                <option value="Novel">Novel</option>
                <option value="Manga">Manga</option>
                <option value="Thriller">Thriller</option>
                <option value="Educational">Educational</option>
                <option value="Bussiness">Bussiness</option>
                <option value="History">History</option>
                <option value="Biography">Biography</option>
                <option value="Mystery">Mystery</option>
                <option value="Fiction">Fiction</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Others">Others</option>
              </select>
              <input
                type="text"
                name="author"
                value={book.author}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="publication"
                value={book.publication}
                onChange={handleChange}
                required
              />
              <input
                type="number"
                name="price"
                value={book.price}
                onChange={handleChange}
                required
              />
              <textarea
                name="description"
                value={book.description}
                onChange={handleChange}
                required
              />
            </div>
            <div className="btn-collection">
              <button type="submit" className="confirm">
                Update
              </button>
              <button type="button" className="cancel" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditBook;
