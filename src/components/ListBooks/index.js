import React from 'react';
import {Link} from 'react-router-dom';

import BookShelf from '../BookShelf';
import './list_books.css';

const TITLES = {
  currentlyReading: 4,
  wantToRead: 3,
  read: 2,
  none: 1
};

const ListBooks = props => {
  const {allBooks, handleSelect} = props;
  const bookShelf = allBooks.reduce((shelf, book) => {
    shelf[book.shelf] ? shelf[book.shelf].push(book) : shelf[book.shelf] = [book];
    return shelf;
  }, {});
  const titlesOrder = Object.keys(bookShelf).sort((a, b) => {
    if (TITLES[a] && (TITLES[b])) {
      return TITLES[b] - TITLES[a];
    } else {
      return 0;
    }
  });

  return(
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {titlesOrder.map((shelf, index) => {
            return(
              <div key={index}>
                <BookShelf
                  title={shelf}
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
