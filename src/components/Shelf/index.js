import React, {Component} from 'react';

import './index.css';


const IMG_URL = 'http://covers.openlibrary.org/b/olid/';
const IMG_SIZE = '-M.jpg';

class Shelf extends Component {
    constructor(props) {
        super(props);

        this.onRemoveHandler = this.onRemoveHandler.bind(this);
    }

    onRemoveHandler(key) {
        const { removeFromBookShelfHandler } = this.props;

        removeFromBookShelfHandler(key);
    }

    render() {
        const {
            books,
        } = this.props;

        return (
            <div id="shelf-wrapper">
                <header>Bookshelf</header>
                <div className="flex-container">
                    { books && books.map((book, index) => 
                        <div key={book.key} className="book-wrapper">
                            <div className="cover">
                                <img
                                    src={IMG_URL + book.cover_edition_key + IMG_SIZE}
                                    alt=""
                                />
                            </div>
                            <div className="title">{book.title}</div>
                            <div className="author">{book.author}</div>
                            <button onClick={() => { this.onRemoveHandler(book.key); }}>
                                Remove
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default Shelf;