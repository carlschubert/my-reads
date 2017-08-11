import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import * as BooksAPI from '../../BooksAPI';
import BookShelf from '../BookShelf';
import SEARCH_TERMS from './SEARCH_TERMS';
import './search_books.css';

export default class SearchBooks extends Component {
  state = {
    query: '',
    selectedBooks: []
  };

  updateQuery = (event) => {
    const query = event.target.value;
    this.setState({
      query: query
    });

    if (SEARCH_TERMS.map(str => str.toLowerCase()).includes(query.toLowerCase())) {
      BooksAPI.search(query, 5)
        .then(searchResults => {
          if(!searchResults.error) {
            const allBookIds = this.props.allBooks.map(book => book.id);
            this.setState({
              selectedBooks: searchResults.filter(searchBook => {
                return !allBookIds.includes(searchBook.id);
              }).map(searchBook => {
                searchBook.shelf = 'none';
                return searchBook;
              })
            });
          }
        });
    } else {
      this.setState({
        selectedBooks: []
      });
    }
  }

  handleSearchSelect = (book, shelf) => {
    this.props.handleSelect(book, shelf);
    this.setState(state => ({
      selectedBooks: state.selectedBooks.filter(b => b.id !== book.id)
    }));
  }

  render() {
    const {query, selectedBooks} = this.state;

    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/" />
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              list="search-terms"
              value={query}
              onChange={this.updateQuery} />
          </div>
          <datalist id="search-terms">
            {SEARCH_TERMS.map((term, index) => {
              return (<option key= {index} value={term} />);
            })}
          </datalist>
        </div>
        <div className="search-books-results">
          <BookShelf
            title="Search Results"
            shelfBooks={selectedBooks}
            handleSelect={this.handleSearchSelect} />
        </div>
      </div>
    );
  }
}
