import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import SearchResult from './SearchResult';

class Search extends Component {
  render() {
    let {searchResults, searchBooks, updateBooks} = this.props;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              onChange={event => searchBooks(event.target.value)}
              type="text"
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid__search">
            {searchResults &&
              searchResults.map(book =>
                <SearchResult
                  key={book.id}
                  book={book}
                  searchBooks={searchBooks}
                  searchResults={searchResults}
                  updateBooks={updateBooks}
                  shelf={book.shelf}
                />,
              )}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
