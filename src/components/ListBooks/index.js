import React from 'react';
import {Link} from 'react-router-dom';

import BookShelf from '../BookShelf';

const ListBooks = props => {
  const {allBooks} = props;
  const bookShelves = {
    currentlyReading: [],
    wantToRead: [],
    read: []
  };
  allBooks.forEach((book) => {
    bookShelves[book.shelf].push(book);
  });

  const formattedTitles = {
    currentlyReading: 'Currently Reading',
    wantToRead: 'Want to Read',
    read: 'Read'
  };

  return(
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {Object.keys(bookShelves).map((shelf, index) => {
            return(
              <div key={index}>
                <BookShelf title={formattedTitles[shelf]} shelfBooks={bookShelves[shelf]} />
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
