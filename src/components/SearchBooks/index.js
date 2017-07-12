import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import escapeRegExp from 'escape-string-regexp';

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
    const {allBooks} = this.props;

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
          <ol className="books-grid"></ol>
        </div>
      </div>
    );
  }
}
