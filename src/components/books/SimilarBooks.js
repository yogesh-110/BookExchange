import React, { useEffect, useState } from 'react';
import { query, where, getDocs, collection, limit } from 'firebase/firestore';
import { db } from '../../firebase';
import BookCard from '../cards/BookCard';

function SimilarBooks({ book }) {
  const [similarBooks, setSimilarBooks] = useState([]);
  const [selectedOption, setSelectedOption] = useState('postedUserId'); // Default option is 'postedUserId'

  

  useEffect(() => {
    const fetchSimilarBooks = async () => {
      try {
        if (!book) return;

        let similarBooksQuery;

        if (selectedOption === 'postedUserId') {
          similarBooksQuery = query(
            collection(db, 'books'),
            where('postedUserId', '==', book.postedUserId),
            // where('id', '!=', book.id),
            limit(8)
          );
        } else if (selectedOption === 'category') {
          similarBooksQuery = query(
            collection(db, 'books'),
            where('category', '==', book.category),
            // where('id', '!=', book.id),
            limit(8)
          );
        } else if (selectedOption === 'author') {
          similarBooksQuery = query(
            collection(db, 'books'),
            where('author', '==', book.author),
            // where('id', '!=', book.id),
            limit(8)
          );
        }

        const similarBooksSnapshot = await getDocs(similarBooksQuery);

        let similarBooksData = [];
        similarBooksSnapshot.forEach((doc) => {
          similarBooksData.push({ id: doc.id, ...doc.data() });
        });

        setSimilarBooks(similarBooksData);
      } catch (error) {
        console.error('Error fetching similar books:', error);
      }
    };

    fetchSimilarBooks();
  }, [book, selectedOption]); // Run effect when book prop or selectedOption changes

  console.log(similarBooks);

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <div className="filters">
        <h2>Similar Books</h2>
        <select
          id="selectOption"
          value={selectedOption}
          onChange={handleSelectChange}
        >
          <option value="postedUserId">Posted User</option>
          <option value="category">Category</option>
          <option value="author">Author</option>
        </select>{' '}
      </div>
      <div className="BookContainer">
        {similarBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}

export default SimilarBooks;
