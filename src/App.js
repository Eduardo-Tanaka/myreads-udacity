import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'
import Search from './Search'
import debounce from 'debounce'
import { Route, Link } from 'react-router-dom'
import BookDetail from './BookDetail'

class BooksApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,    // loading a ser exibido ao procurar os livros na api e ao mudar os livro de status
      reading: [],      
      wantToRead: [],   
      read: [],
      searchResults: [],
      isOpen: false,
      bookDetail: {},
         bookShelves: [
        "Currently Reading",
        "Want To Read",
        "Read"
      ]
    }

    // This binding is necessary to make `this` work in the callback
    this.moveToShelf = this.moveToShelf.bind(this);
    this.search = this.search.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggle(book) {
    this.setState({
      isOpen: !this.state.isOpen,
      bookDetail: book
    });
  }

  // move o livro para a estante
  moveToShelf(book, shelf) { // livro que será movido e a estante
    this.setState({ loading: true });
    BooksAPI.update(book, shelf)
      .then(() => {
        this.removeFromShelf(book);
        this.addToShelf(book, shelf);      
        this.setState({ loading: false });
      });
  }

  // adiciona o livro na estante nova
  addToShelf(book, shelf) {
    if(shelf !== "none") { // se não for colocar em nenhuma estante, não precisa adicionar
      let books = this.getBooksFromShelf(shelf);
      book.shelf = shelf;
      books.push(book);

      if(shelf === "currentlyReading") {    
        this.setState({ reading: books });
      } else if(shelf === "wantToRead") {
        this.setState({ wantToRead: books });
      } else if(shelf === "read") {
        this.setState({ read: books });
      }
    } 
  }

  // remove o livro da estante antiga
  removeFromShelf(book) {
    if(book.shelf !== "none") { // se não estava em nenhuma estante ainda, não precisa remover
      let books = this.getBooksFromShelf(book.shelf);
      books = books.filter((el) => el.id !== book.id);
      if(book.shelf === "currentlyReading") {
        this.setState({ reading: books });
      } else if(book.shelf === "wantToRead") {
        this.setState({ wantToRead: books });
      } else if(book.shelf === "read") {
        this.setState({ read: books });
      }
    }  
  }

  // pega os livros de determinada estante
  getBooksFromShelf(shelf) {
    let books;
    if(shelf === "currentlyReading") {
      books = this.state.reading;
    } else if(shelf === "wantToRead") {
      books = this.state.wantToRead;
    } else if(shelf === "read") {
      books = this.state.read;
    }
    return books;
  }

  // mapeia todos os livros do usuário para as estantes certas
  mapShelf(books) {
    let reading = [];
    let wantToRead = [];
    let read = [];
    books.forEach((book) => {
      if(book.shelf === "currentlyReading") {
        reading.push(book);
      } else if(book.shelf === "wantToRead") {
        wantToRead.push(book);
      } else if(book.shelf === "read") {
        read.push(book);
      }
    });

    this.setState({ reading: reading, wantToRead: wantToRead, read: read }, this.setState({ loading: false }));
  }

  // procura os livros
  search(query) {
    if(query.length === 0) {
      this.setState({ searchResults: [] })
      return
    }

    this.setState({ loading: true })

    BooksAPI.search(query)
      .then((books) => {
        if(books.error) {
          this.setState({ searchResults: [] })
        } else {
          // junta os array de todos os status de livros para poder pegar o status do livro caso ele apareça nos livros buscados
          const allBooks = this.state.reading.concat(this.state.wantToRead).concat(this.state.read);
          this.setState({
            searchResults: books.map((book) => { // itera por todos os livros buscados
              const a = allBooks.find((el) => { // verifica se algum dos livros faz parte da sua lista
                if(book.id === el.id) {
                  return true;
                }
              })
              book.shelf = a ? a.shelf : "none"; // adiciona a qual estante está o livro
              return book;
            }) 
          })
        }
        this.setState({ loading: false })    
      })
  }

  // pega os livros do usuário
  componentDidMount() {
    BooksAPI
      .getAll()
      .then((books) => this.mapShelf(books));

    this.search = debounce(this.search, 400)
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>           
            <div className="list-books-content">
              <div>
                {this.state.bookShelves.map( (bookShelf) => {
                  let books = [];
                  if(bookShelf === "Currently Reading") {
                    books = this.state.reading;
                  } else if(bookShelf === "Want To Read") {
                    books = this.state.wantToRead;
                  } else if(bookShelf === "Read") {
                    books = this.state.read;
                  }
                  return <BookShelf key={bookShelf} title={bookShelf} books={books} move={this.moveToShelf} loading={this.state.loading} toggle={this.toggle} /> 
                })}               
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )} />
        
        <Route path="/search" render={() => (
          <Search results={this.state.searchResults} search={this.search} loading={this.state.loading} move={this.moveToShelf} toggle={this.toggle} />
        )} />
        
        <BookDetail toggle={this.toggle} bookDetail={this.state.bookDetail} isOpen={this.state.isOpen} />
      </div>
    )
  }
}

export default BooksApp