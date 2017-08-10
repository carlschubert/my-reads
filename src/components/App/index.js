import React from 'react';
import {Route} from 'react-router-dom';

import * as BooksAPI from '../../BooksAPI';
import './app.css';
import ListBooks from '../ListBooks';
import SearchBooks from '../SearchBooks';
import SingleBook from '../SingleBook';

export default class BooksApp extends React.Component {
  state = {
    allBooks: [],
  };

  componentDidMount() {
    BooksAPI.getAll()
      .then(books => {
        this.setState({
          allBooks: books
        });
      });
  }

  handleSelect = (book, shelf) => {
    if (book.shelf !== shelf) {
      const oldBooks = this.state.allBooks.slice();
      book.shelf = shelf;
      // set state immediately to avoid server delay but roll back if the update fails
      this.setState(state => ({
        books: state.allBooks.filter(b => b.id !== book.id).concat([book])
      }));
      BooksAPI.update(book, shelf).catch(() => {
        this.setState(oldBooks);
      });
    }
  }

  render() {
    const {allBooks} = this.state;
    return (
      <div className="app">
        <Route exact path="/search" render={() => (
          <SearchBooks
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
