import React, { Component } from 'react';

import Search from './components/Search';
import List from './components/List';
import Shelf from './components/Shelf';

import './App.css';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bookShelf: [],
      searchResults: [],
      selectedIds: [],
      isLoading: false,
    };

    this.addToBookShelfHandler = this.addToBookShelfHandler.bind(this);
    this.removeFromBookShelfHandler = this.removeFromBookShelfHandler.bind(this);

    this.setSearchResults = this.setSearchResults.bind(this);

    this.setLoadingState = this.setLoadingState.bind(this);
  }

  addToBookShelfHandler(book) {
    let { bookShelf } = this.state;

    bookShelf.push(book);

    this.setState({
      bookShelf,
      selectedIds: this._collectSelectedIds(bookShelf),
    });
  }

  removeFromBookShelfHandler(bookId) {
    const { bookShelf } = this.state;

    let newBookShelf = [];
    for(let i = 0; i < bookShelf.length; i++) {
      if(bookShelf[i].key !== bookId) {
        newBookShelf.push(bookShelf[i]);
      }
    }

    this.setState({
      bookShelf: newBookShelf,
      selectedIds: this._collectSelectedIds(newBookShelf),
    });
  }

  setSearchResults(searchResults, callback) {
    this.setState({
      searchResults,
    }, () => {
      callback();
    });
  }

  setLoadingState(isLoading) {
    this.setState({
      isLoading,
    });
  }

  _collectSelectedIds(bookShelf) {
    let ids = [];

    for(let i = 0; i < bookShelf.length; i++) {
      ids.push(bookShelf[i].key);
    }

    return ids;
  }

  render() {
    const { bookShelf, searchResults, selectedIds, isLoading } = this.state;

    return (
      <div id="app-wrapper">
        <Search
          setSearchResults={this.setSearchResults}
          setLoadingState={this.setLoadingState}
        />
        <List
          books={searchResults}
          booksSelected={selectedIds}
          addToBookShelfHandler={this.addToBookShelfHandler}
          isLoading={isLoading}
        />
        <div className="separator" />
        <Shelf
          books={bookShelf}
          removeFromBookShelfHandler={this.removeFromBookShelfHandler}
          isLoading={isLoading}
        />
      </div>
    );
  }
}

export default App;
