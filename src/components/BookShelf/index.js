import React from 'react';

import Book from '../Book';
import './book_shelf.css';

const BookShelf = props => {
  const {title, shelfBooks, handleSelect} = props;

  return(
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {shelfBooks.map(book => {
            return(
              <li key={book.id}>
                <Book
                  book={book}
                  handleSelect={handleSelect} />
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default BookShelf;
