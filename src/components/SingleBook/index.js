import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import * as BooksAPI from '../../BooksAPI';
import Book from '../Book';

export default class SingleBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedBook: {}
    };
  }

  componentDidMount() {
    const bookId = this.props.params.match.params.bookId;
    this.fetchBook(bookId);
  }

  componentWillReceiveProps(nextProps) {
    const nextBookId = nextProps.params.match.bookId;
    const currentBookId = this.props.params.match.params.bookId;
    if (nextBookId !== currentBookId) {
      this.fetchBook(nextBookId);
    }
  }

  fetchBook(id) {
    BooksAPI.get(id)
      .then(res => res)
      .then(book => this.setState({
        selectedBook: book
      }));
  }

  render() {
    const {handleSelect} = this.props;
    const {selectedBook} = this.state;
    return(
      <div>
        {
          (Object.keys(selectedBook).length > 0)
            ? <Book book={selectedBook} handleSelect={handleSelect} />
            : null
        }
        <div>
          <Link to='/'></Link>
        </div>
      </div>
    );
  }
}
