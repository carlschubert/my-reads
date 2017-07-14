import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import escapeRegExp from 'escape-string-regexp';

import BookShelf from '../BookShelf';

export default class SearchBooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    };
  }

  updateQuery(query) {
    this.setState({query: query.trim()});
  }

  render() {
    const {query} = this.state;
    const {allBooks, handleSelect} = this.props;

    let searchBooks;
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i');
      searchBooks = allBooks.filter(book => {
        return match.test(book.title);
      });
    } else {
      searchBooks = allBooks;
    }

    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/" />
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(e) => this.updateQuery(e.target.value)} />
          </div>
        </div>
        <div className="search-books-results">
          <BookShelf
            title="Search Results"
            shelfBooks={searchBooks}
            handleSelect={handleSelect} />
        </div>
      </div>
    );
  }
}
