import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import SearchBook from './SearchBook'
import BookShelves from './BookShelves'
import './App.css'

class BooksApp extends React.Component {
  state = {
    shelves: {
      currentlyReading: {
        name: 'Currently Reading',
        books: []
      },
      wantToRead: {
        name: 'Want to Read',
        books: []
      },
      read: {
        name: 'Read',
        books: []
      }
    }
  }

  moveBook = (book, newShelf) => {
    this.setState((state) => {
      const bookIndex = this.state.shelves[book.shelf].books.indexOf(book)
      state.shelves[book.shelf].books.splice(bookIndex, 1)
      state.shelves[newShelf].books.push(book)
      book.shelf = newShelf
    })
    BooksAPI.update(book, newShelf)
  }

  componentDidMount() {
    BooksAPI.getAll().then((data) => {
      data.forEach((book) => {
        this.setState((state) => {
          state.shelves[book.shelf].books.push(book);
        })
      })
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <BookShelves 
            booksInShelves={this.state.shelves}
            onMoveBook={this.moveBook} />
        )} />
        <Route path="/search" component={SearchBook} />
      </div>
    )
  }
}

export default BooksApp
