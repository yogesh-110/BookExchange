import React from 'react';
import { BsSearch } from 'react-icons/bs';
import { GoSortAsc, GoSortDesc } from 'react-icons/go';

function BookSearch({ setSearchTerm, sortByRecent, toggleSortPreference }) {
  return (
    <div className="filters">
      <div className="bookSort">
        {sortByRecent ? (
          <button onClick={toggleSortPreference}>
            Most Recent <GoSortDesc size={16} />
          </button>
        ) : (
          <button onClick={toggleSortPreference}>
            Least Recent <GoSortAsc size={16} />
          </button>
        )}
      </div>
      <div className="bookSearch">
        <input
          type="text"
          placeholder="Search for Books"
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term on change
        />
        <BsSearch />
      </div>
    </div>
  );
}

export default BookSearch;
