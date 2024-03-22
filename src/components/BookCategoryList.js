import { useState } from 'react';
import { Listbox } from '@headlessui/react';

const genres = [
  { id: 0, name: 'All', unavailable: false },
  { id: 1, name: 'Action', unavailable: false },
  { id: 2, name: 'Fiction', unavailable: false },
  { id: 3, name: 'Romance', unavailable: false },
  { id: 4, name: 'Thiller', unavailable: true },
  { id: 5, name: '18+', unavailable: false },
];

function BookCategoryList({ setSelectedGenre }) {
  const [selectedGenre, setSelectedGenreLocal] = useState(genres[0]);

  const handleSelectionChange = (value) => {
    setSelectedGenreLocal(value);
    setSelectedGenre(value);
  };

  return (
    <Listbox value={selectedGenre} onChange={handleSelectionChange}>
      <div className="book-category-list w-full">
        <Listbox.Button className="book-category-list__button">
          {selectedGenre.name}
        </Listbox.Button>
        <Listbox.Options className="book-category-list__options">
          {genres.map((person) => (
            <Listbox.Option key={person.id} value={person}>
              {({ active, selected }) => (
                <li
                  className={`book-category-list__option ${
                    active ? 'active' : ''
                  } ${selected ? 'selected' : ''}`}
                >
                  {person.name}
                  {selected && (
                    <span className="selected-icon">
                      <svg
                        className="icon"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 4.293a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L10 6.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  )}
                </li>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
}

export default BookCategoryList;
