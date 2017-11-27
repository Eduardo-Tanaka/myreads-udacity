import React from 'react'
import Book from './Book'
import PropTypes from 'prop-types'

// Essa classe representa a estante de livros
class BookShelf extends React.Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className={this.props.loading ? "loader" : ""}></div>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map( (obj) =>
              <li key={obj.id}>
               <Book book={obj} move={this.props.move} searchPage={false} toggle={this.props.toggle} />
              </li>
            )}
          </ol>
        </div>
      </div>
    )
  }
}

BookShelf.propTypes = {
  title: PropTypes.string,
  books: PropTypes.array,
  loading: PropTypes.bool,
  move: PropTypes.func,
  toggle: PropTypes.func
}

export default BookShelf