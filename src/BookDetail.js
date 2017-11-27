import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types'
import QRCode from 'qrcode.react'

// Essa classe representa o modal com os detalhes de um livro
class BookDetail extends React.Component {
  render() {
    const book = this.props.bookDetail
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} className="modal-dialog modal-lg" backdrop="static">
        <ModalHeader toggle={this.props.toggle}>{this.props.bookDetail.title}</ModalHeader>
        <ModalBody>
          <div className="row">
            <div className="col-md-3">
              <img alt="book" src={this.props.bookDetail.imageLinks !== undefined ? this.props.bookDetail.imageLinks.thumbnail : ""} style={{marginBottom: 20}} />
              <QRCode value={book.canonicalVolumeLink !== undefined ? book.canonicalVolumeLink : ''} />
              <div style={{marginTop: 20}}>
                <span className="book-detail">{book.shelf}</span>
                <p><a href={book.infoLink} target="_blank">more info</a></p>
              </div>
            </div>
            <div className="col-md-9">
              <h5>{book.subtitle}</h5>
              <p>{book.publisher} - {book.publishedDate} - {book.language} - {book.pageCount} pages</p>
              <p>{book.authors}</p>
              <span className="book-detail">{book.categories}</span>                        
              <div style={{marginTop: 20}}>{this.props.bookDetail.description}</div>
            </div>
          </div>
            <div className="col-md-12">
              
            </div>
        </ModalBody>
        <ModalFooter>
          <Button color="default" onClick={this.props.toggle}>Fechar</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

BookDetail.propTypes = {
  bookDetail: PropTypes.object,
  toggle: PropTypes.func,
  isOpen: PropTypes.bool
}

export default BookDetail