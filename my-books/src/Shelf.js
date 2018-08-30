import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Book from './Book';
import {Link} from 'react-router-dom';

class Shelf extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    shelfName: PropTypes.string.isRequired,
  };

  render() {
    let {books, className, shelfName} = this.props;
    return (
      <div className={className + ' list-books-content'}>
        <div>
          <div className="bookshelf">
            <div className="bookshelf-books">
              <ol className="books-grid">
                {books.filter(book => book.shelf === shelfName).map(book =>
                  <li className="books-grid-row" key={book.id}>
                    <Book
                      shelf={book.shelf}
                      title={book.title}
                      authors={book.authors}
                      averageRating={book.averageRating}
                      cover={book.imageLinks.thumbnail}
                      pageCount={book.pageCount}
                      publishedDate={book.publishedDate}
                      updateBooks={this.props.updateBooks}
                      book={book}
                    />
                  </li>,
                )}
              </ol>
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a Book</Link>
        </div>
      </div>
    );
  }
}

export default Shelf;
