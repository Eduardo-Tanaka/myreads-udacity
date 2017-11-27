import React from 'react'
import Book from './Book'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

// Essa classe representa os livros procurados
class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
    }

    this.searchBooks = this.searchBooks.bind(this);
  }

  searchBooks(e) {
	this.setState({ query: e.target.value })
  	this.props.search(e.target.value)
  }

  render() {
    return (
      <div className="search-books">
	    <div className="search-books-bar">
	      <Link className="close-search" to="/">Close</Link>
	      <div className="search-books-input-wrapper">
	        {/*
	          NOTES: The search from BooksAPI is limited to a particular set of search terms.
	          You can find these search terms here:
	          https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

	          However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
	          you don't find a specific author or title. Every search is limited by search terms.
	        */}
	        <input type="text" placeholder="Search by title or author" onChange={this.searchBooks} />
	      </div>
	    </div>
	    <div className="search-books-results">
	      <div className={this.props.loading ? "loader" : ""}></div>
	      <ol className="books-grid">
	        {this.props.results.map( (obj) =>
	          <li key={obj.id}>
	           <Book book={obj} move={this.props.move} searchPage={true} toggle={this.props.toggle} />
	          </li>
	        )}
	      </ol>
	    </div>
	  </div>
    )
  }
}

Search.propTypes = {
  results: PropTypes.array,
  search: PropTypes.func,
  loading: PropTypes.bool,
  move: PropTypes.func
}

export default Search