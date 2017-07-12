import React from 'react';

import Book from '../Book';

const BookShelf = props => {
  const {title, shelfBooks} = props;
  const formattedTitles = {
    currentlyReading: 'Currently Reading',
    wantToRead: 'Want to Read',
    read: 'Read'
  };

  return(
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {shelfBooks.map(book => {
            return(
              <li key={book.id}>
                <Book book={book} />
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  );
};

export default BookShelf;
