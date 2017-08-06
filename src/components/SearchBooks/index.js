import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import * as BooksAPI from '../../BooksAPI';
import BookShelf from '../BookShelf';
import SEARCH_TERMS from './SEARCH_TERMS';
import './search_books.css';

export default class SearchBooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      selectedBooks: []
    };
    this.updateQuery = this.updateQuery.bind(this);
  }

  updateQuery(query) {
    this.setState({
      query: query
    });

    if (SEARCH_TERMS.map(str => str.toLowerCase()).includes(query.toLowerCase())) {
      BooksAPI.search(query, 5)
        .then(searchResults => {
          if(!searchResults.error) {
            this.setState({
              selectedBooks: searchResults
            });
          }
        });
    } else {
      this.setState({
        selectedBooks: []
      });
    }
  }

  render() {
    const {query, selectedBooks} = this.state;
    const {handleSelect} = this.props;

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
              onChange={(e) => this.updateQuery(e.target.value)} />
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
            handleSelect={handleSelect} />
        </div>
      </div>
    );
  }
}
