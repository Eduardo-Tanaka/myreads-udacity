import React from 'react'
import SelectStatus from './SelectStatus'
import PropTypes from 'prop-types'

// Essa classe representa 1 livro da estante de livros
class Book extends React.Component {
  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.changeStatus = this.changeStatus.bind(this);
    this.showBookDetail = this.showBookDetail.bind(this);
  }

  // muda o status do livro
  changeStatus(e) {
    this.props.move(this.props.book, e.target.value);
  }

  // mostra o modal dos detalhes do livro
  showBookDetail() {
    this.props.toggle(this.props.book)
  }

  render() {
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" onClick={this.showBookDetail} style={{ width: 128, height: 193, backgroundImage: `url(${this.props.book.imageLinks.thumbnail})` }}></div>
          <div className="book-shelf-changer">
            <SelectStatus changeStatus={this.changeStatus} selected={this.props.book.shelf} searchPage={this.props.searchPage} />
          </div>
        </div>
        <div className="book-title">{this.props.book.title}</div>
        <div className="book-authors">{this.props.book.authors}</div>
      </div>
    )
  }
}

Book.propTypes = {
  book: PropTypes.object,
  searchPage: PropTypes.bool,
  move: PropTypes.func,
  toggle: PropTypes.func
}

export default Book