import React from 'react'
import BookShelf from './BookShelf'
import PropTypes from 'prop-types'

// Essa classe representa a estante de livros
class BookShelves extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
     <div>
     {this.props.bookShelves.map(() => <BookShelf />)}
     </div>
    )
  }
}

export default BookShelves