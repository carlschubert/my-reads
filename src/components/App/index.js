import React from 'react';
import {Route} from 'react-router-dom';

import * as BooksAPI from '../../BooksAPI';
import './App.css';
import ListBooks from '../ListBooks';
import SearchBooks from '../SearchBooks';

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allBooks: []
    };
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then(books => {
        this.setState({allBooks: books});
      });
  }

  render() {
    const {allBooks} = this.state
    return (
      <div className="app">
        <Route exact path="/search" component={SearchBooks}></Route>
        <Route exact path="/" render={() => <ListBooks allBooks={allBooks} />}></Route>
      </div>
    );
  }
}

export default BooksApp;
