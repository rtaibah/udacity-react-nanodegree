import React, {Component} from 'react';
import {BrowserRouter, Route, Redirect} from 'react-router-dom';

import AppRouter from './AppRouter';
import Search from './Search';
import Shelf from './Shelf';

import * as BooksAPI from './BooksAPI.js';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.updateBooks = this.updateBooks.bind(this);
    this.searchBooks = this.searchBooks.bind(this);

    this.state = {
      books: [],
      searchResults: [],
    };
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({books});
    });
  }

  updateBooks(book, shelf) {
    BooksAPI.update(book, shelf);
    // Find index of book based on comparison of id's
    const index = this.state.books.findIndex(
      shelfedBook => shelfedBook.id === book.id,
    );
    const {books} = this.state;

    // Handle when new book is added with no index resulting in a '-1' index
    if (index === -1) {
      this.setState({
        books: [...books, {...book, shelf: shelf}],
      });
    }

    if (index !== -1) {
      this.setState({
        // Get all books up to the book we want to update
        books: [
          ...books.slice(0, index),
          // Update book shelf
          {...book, shelf: shelf},
          // Append all books after book we want to update
          ...books.slice(index + 1),
        ],
      });
    }
  }

  searchBooks(query) {
    BooksAPI.search(query, 2)
      .then(searchResults => {
        this.state.books.forEach(book => {
          // return index of book if exists in search results
          const index = searchResults.findIndex(
            searchResult => searchResult.id === book.id,
          );
          if (index !== -1) {
            searchResults[index].shelf = book.shelf;
          }
        });
        searchResults && this.setState({searchResults});
      })
      .catch(e => {
        Promise.resolve();
      });
  }

  render() {
    let shelves = [
      {
        shelfName: 'currentlyReading',
        className: 'currently-reading',
        path: '/reading',
      },
      {
        shelfName: 'wantToRead',
        className: 'want-to-read',
        path: '/want',
      },
      {
        shelfName: 'read',
        className: 'already-read',
        path: '/read',
      },
    ];

    return (
      <BrowserRouter>
        <div className="app">
          {shelves.map(shelf => {
            return (
              <AppRouter path={shelf.path} key={shelf.shelfName}>
                <div className="shelf-wrapper">
                  <Shelf
                    className={'shelf ' + shelf.className}
                    shelfName={shelf.shelfName}
                    books={this.state.books}
                    updateBooks={this.updateBooks}
                  />
                </div>
              </AppRouter>
            );
          })}
          <Route
            exact
            path="/search"
            render={() =>
              <Search
                books={this.state.books}
                searchBooks={this.searchBooks}
                searchResults={this.state.searchResults}
                updateBooks={this.updateBooks}
              />}
          />
          <Route exact path="/" render={() => <Redirect to="/reading" />} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
