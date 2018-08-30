import React, {Component} from 'react';
import Changer from './Changer';

class SearchResult extends Component {
  render() {
    let {book} = this.props;
    return (
      <li>
        <div className="book__search">
          <div className="book-top__search">
            <div
              className="book-cover__search"
              style={{
                width: '128px',
                height: '100%',
                backgroundSize: 'cover',
                backgroundImage: `url('${book.imageLinks.thumbnail}')`,
              }}
            />
            <div className="book-shelf-changer__search">
              <Changer book={book} updateBooks={this.props.updateBooks} />
            </div>
          </div>
          <div className="book-title__search">
            {book.title && book.title}
          </div>
          <div className="book-authors__search">
            {Array.isArray(book.authors) && book.authors}
          </div>
        </div>
      </li>
    );
  }
}

export default SearchResult;
