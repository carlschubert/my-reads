import React, {Component} from 'react';
import classnames from 'classnames';

import Book from '../Book';
import './book_shelf.css';

export default class BookShelf extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dragHover: false
    };
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
  }

  onDrop(event, shelf, handleSelect) {
    const bookId = event.dataTransfer.getData('bookId');
    handleSelect(bookId, shelf);
    this.onDragEnd();
  }

  onDragEnd() {
    this.setState({
      dragHover: false
    });
  }

  onDragOver() {
    this.setState({
      dragHover: true
    });
  }

  render() {
    const {title, shelfBooks, handleSelect} = this.props;
    const regularTitle = title
      // insert a space before all caps
      .replace(/([A-Z])/g, ' $1')
      // uppercase the first character
      .replace(/^./, first => first.toUpperCase());

    const bookShelfClass = classnames('bookshelf-books', {
      'draghover': this.state.dragHover
    });

    return(
      <div
        className="bookshelf">
        <h2 className="bookshelf-title">{regularTitle}</h2>
        <div
          className={bookShelfClass}
          onDragOver={(e) => {
            e.preventDefault();
            this.onDragOver();
          }}
          onDragEnter={this.onDragOver}
          onDrop={(e) => this.onDrop(e, title, handleSelect)}
          onDragLeave={this.onDragEnd}
          onDragEnd={this.onDragEnd}
        >
          <ol className="books-grid">
            {shelfBooks.map(book => {
              return(
                <li key={book.id}>
                  <Book
                    book={book}
                    handleSelect={handleSelect} />
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    );
  }
}
