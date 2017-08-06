import React from 'react';
import {Route} from 'react-router-dom';

import * as BooksAPI from '../../BooksAPI';
import './app.css';
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
    const newBooks = this.state.allBooks.slice();
    const oldBooks = this.state.allBooks.slice();
    const updatededBook = newBooks.find(oldBook => {
      return oldBook.id === book.id;
    });
    if(updatededBook) {
      updatededBook.shelf = shelf;
      this.setState({allBooks: newBooks});
      BooksAPI.update(book, shelf)
        .catch((res) => {
          this.setState({allBooks: oldBooks});
        });
    } else {
      book.shelf = shelf;
      newBooks.push(book);
      this.setState({allBooks: newBooks});
      BooksAPI.update(book, shelf)
        .catch((res) => {
          this.setState({allBooks: oldBooks});
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
