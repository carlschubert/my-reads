import React from 'react';

import Book from '../Book';
import './book_shelf.css';

const onDrop = (event, shelf, handleSelect) => {
  const bookId = event.dataTransfer.getData('bookId');
  handleSelect(bookId, shelf);
};

const BookShelf = props => {
  const {title, shelfBooks, handleSelect} = props;
  const regularTitle = title
    // insert a space before all caps
    .replace(/([A-Z])/g, ' $1')
    // uppercase the first character
    .replace(/^./, first => first.toUpperCase());

  return(
    <div
      className="bookshelf"
      onDrop={(e) => onDrop(e)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => onDrop(e, title, handleSelect)}>
      <h2 className="bookshelf-title">{regularTitle}</h2>
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
