import React, {Component} from 'react';

import Loader from '../Loader';
import './index.css';


const API_URL = 'http://openlibrary.org/search.json?q=';
const SEARCH_FIELD_TIMEOUT = 500;

class Search extends Component {
    constructor(props) {
        super(props);

        this.timeout = null;

        this.state = {
            searchStr: '',
            isLoading: false,
        };

        this.searchStrChangeHandler = this.searchStrChangeHandler.bind(this);
    }

    searchStrChangeHandler(event) {
        const { setSearchResults, setLoadingState } = this.props;

        const value = event.target.value || '';

        this.setState({
            searchStr: value,
        }, () => {
            if(this.timeout) clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                this.setState({
                    isLoading: true,
                }, () => {
                    setLoadingState(true);
        
                    fetch(API_URL + encodeURI(value))
                        .then(response => response.json())
                        .then(data => {
                            setSearchResults(this._collectBooksList(data.docs), () => {
                                setLoadingState(false);
                                
                                this.setState({
                                    isLoading: false,
                                });
                            });
                        });
                });
            }, SEARCH_FIELD_TIMEOUT);
        });
    }

    _collectBooksList(allInfo) {
        let booksList = [];

        for(let i = 0; i < allInfo.length; i++) {
            booksList.push({
                key: allInfo[i].key || -1,
                title: allInfo[i].title || '',
                author: (allInfo[i].author_name && allInfo[i].author_name.length > 0) ? allInfo[i].author_name[0] : 'Unknown',
                cover_edition_key: allInfo[i].cover_edition_key || '' ,
            });
        }

        return booksList;
    }

    render() {
        const { searchStr, isLoading, } = this.state;

        return (
            <div id="search-wrapper">
                <header>Search</header>

                <input
                    type="text"
                    value={searchStr}
                    onChange={this.searchStrChangeHandler}
                    disabled={isLoading}
                />
            </div>
        );
    }
}

export default Search;