import React from 'react';
import {Route} from 'react-router-dom';

import * as BooksAPI from '../../BooksAPI';
import './App.css';
import ListBooks from '../ListBooks';
import SearchBooks from '../SearchBooks';
import SingleBook from '../SingleBook';

export default class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allBooks: [],
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then(books => {
        this.setState({
          allBooks: books
        });
      });
  }

  handleSelect(book, shelf) {
    BooksAPI.update(book, shelf)
      .then(() => {
        const newBooks = this.state.allBooks.slice();
        newBooks.find(oldBook => {
          return oldBook.id === book.id;
        }).shelf = shelf;
        this.setState({allBooks: newBooks});
      });
  }

  render() {
    const {allBooks} = this.state;
    return (
      <div className="app">
        <Route exact path="/search" render={() => (
          <SearchBooks
            allBooks={allBooks}
            handleSelect={this.handleSelect}
          />)}>
        </Route>
        <Route exact path="/" render={() => (
          <ListBooks
            allBooks={allBooks}
            handleSelect={this.handleSelect}
          />)}>
        </Route>
        <Route
          path="/books/:bookId"
          render={(params) => <SingleBook params={params} handleSelect={this.handleSelect} />} />
      </div>
    );
  }
}
