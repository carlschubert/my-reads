import React from 'react';

import {Link} from 'react-router-dom';
import './book.css';

const drag = (event, bookId) => {
  event.dataTransfer.setData('bookId', bookId);
};

const Book = props => {
  const {book, handleSelect} = props;
  return(
    <div
      className="book"
      draggable="true"
      onDragStart={(e) => drag(e, book.id)}>
      <div className="book-top">
        <Link
          to={`/books/${book.id}`}
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${book.imageLinks.smallThumbnail})`
          }}>
        </Link>
        <div className="book-shelf-changer">
          <select
            onChange={(e) => handleSelect(book.id, e.target.value)}
            value={book.shelf}>
            <option value="none" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{book.authors}</div>
    </div>
  );
};

export default Book;
