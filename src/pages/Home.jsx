import React, { useContext, useEffect, useState } from 'react';
import BookCard from '../components/cards/BookCard';
import { AuthContext } from '../contexts/AuthContext';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import BookSearch from '../components/BookSearch';

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  const [postedBooks, setPostedBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortByRecent, setSortByRecent] = useState(true); // State to track sorting preference

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'books'), (snapshot) => {
      const booksData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPostedBooks(booksData);
      console.log("booksData", booksData)
    });

    return () => unsubscribe();
  }, []);

  const userPostedBookIds = postedBooks
    .filter(
      (book) => book.postedUserId === (currentUser ? currentUser.uid : null)
    )
    .map((book) => book.id);

  const filteredBooks = postedBooks
    .filter(
      (book) =>
        !userPostedBookIds.includes(book.id) &&
        (book.bookName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.category.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) =>
      sortByRecent
        ? b.postedDate.seconds - a.postedDate.seconds
        : a.postedDate.seconds - b.postedDate.seconds
    );

  // Function to toggle sorting preference
  const toggleSortPreference = () => {
    setSortByRecent((prevSortByRecent) => !prevSortByRecent);
  };
console.log("all books", filteredBooks)
  const renderBookCard = (book) => {
    return <BookCard key={book.id} book={book} />;
  };
  return (
    <div className="HomeContainer">
      <section className="Banner">
        <h1>Book Store</h1>
        <BookSearch
          setSearchTerm={setSearchTerm}
          sortByRecent={sortByRecent}
          toggleSortPreference={toggleSortPreference}
        />
        <div className="BookContainer">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => renderBookCard(book))
          ) : (
            <p>No books found</p>
          )}
        </div>
      </section>
      <section className="NewArriavle"></section>
      <section className="MostReviewed"></section>
      <section className="BestSeller"></section>

      {/* <div className='RecommendedBook'>
        <h1>Recommended Books</h1>
        <RecommendedBooks userId={currentUser.uid}/>
      </div> */}
    </div>
  );
  
};

export default Home;
