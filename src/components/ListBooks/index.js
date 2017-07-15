import React from 'react';
import {Link} from 'react-router-dom';

import BookShelf from '../BookShelf';
import './list_books.css';

const ListBooks = props => {
  const {allBooks, handleSelect} = props;
  const bookShelf = allBooks.reduce((shelf, book) => {
    shelf[book.shelf] ? shelf[book.shelf].push(book) : shelf[book.shelf] = [book];
    return shelf;
  }, {});

  const formattedTitles = {
    currentlyReading: 'Currently Reading',
    wantToRead: 'Want to Read',
    read: 'Read',
    none: 'Not Assigned'
  };

  return(
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {Object.keys(bookShelf).map((shelf, index) => {
            return(
              <div key={index}>
                <BookShelf
                  title={formattedTitles[shelf]}
                  shelfBooks={bookShelf[shelf]}
                  handleSelect={handleSelect} />
              </div>
            );
          })}
        </div>
      </div>
      <div className="open-search">
        <Link to="/search" />
      </div>
    </div>
  );
};

export default ListBooks;
