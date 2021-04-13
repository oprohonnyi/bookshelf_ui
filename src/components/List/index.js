import React, {Component} from 'react';

import Loader from '../Loader';
import './index.css';


const IMG_URL = 'http://covers.openlibrary.org/b/olid/';
const IMG_SIZE = '-M.jpg';

class List extends Component {
    constructor(props) {
        super(props);

        this.onAddHandler = this.onAddHandler.bind(this);
    }

    onAddHandler(book) {
        const { addToBookShelfHandler } = this.props;

        addToBookShelfHandler(book);
    }

    render() {
        const {
            books,
            booksSelected,
            isLoading,
        } = this.props;

        return (
            <div id="list-wrapper">
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
                            { booksSelected.indexOf(book.key) === -1 &&
                                <button onClick={() => { this.onAddHandler(book); }}>
                                    Add
                                </button>
                            }
                            { booksSelected.indexOf(book.key) !== -1 &&
                                <div className="info">Already in bookshelf</div>
                            }
                        </div>
                    )}
                </div>

                { isLoading &&
                    <Loader />
                }
            </div>
        );
    }
}

export default List;