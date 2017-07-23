import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import SearchBook from './SearchBook'
import BookShelves from './BookShelves'
import './App.css'

class BooksApp extends React.Component {
  static MAX_RESULTS = 20

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
      },
      none: {
        name: 'None',
        books: []
      }
    },
    searchedBooks: []
  }

 /**
  * @description Move book from one state to another, and update the same in the backend call
  * @param {object} book the book object to be moved
  * @param {string} newShelf the new bookshelf where the book needs to be moved
  */
  moveBook = (book, newShelf) => {
    this.setState((state) => {
      const bookIndex = this.state.shelves[book.shelf].books.indexOf(book)
      state.shelves[book.shelf].books.splice(bookIndex, 1)
      state.shelves[newShelf].books.push(book)
      book.shelf = newShelf
    })
    BooksAPI.update(book, newShelf)
  }

 /**
  * @description Search books based on query
  * @param {string} query the query strin to perform search
  */
  searchBooks = (query) => {
    const state = this.state
    // Remove all the books if the query string text is removed
    if (query === '') {
      this.setState((state) => {
        state.searchedBooks = []
      })
    } else {
      BooksAPI.search(query, this.MAX_RESULTS).then((data) => {
        if (data.length > 0) {
          data.map((book) => {
            // Check each searched book in the 'currently reading' shelf and update shelf value if found
            const currentlyReadingCheck = state.shelves.currentlyReading.books.filter((shelfBook) => (shelfBook.id === book.id))
            if (currentlyReadingCheck.length > 0) {
              book.shelf = currentlyReadingCheck[0].shelf
            } else {
              // If not, check the book in 'want to read' shelf and update if found
              const wantToReadCheck = state.shelves.wantToRead.books.filter((shelfBook) => (shelfBook.id === book.id)) 
              if (wantToReadCheck.length > 0) {
                book.shelf = wantToReadCheck[0].shelf
              } else {
                // If not, check the book in 'read' shelf and update if found
                const readCheck = state.shelves.read.books.filter((shelfBook) => (shelfBook.id === book.id))
                if (readCheck.length > 0) {
                  book.shelf = readCheck[0].shelf
                } else {
                  // if book is not found in any shelf, mark the shelf as 'none'
                  book.shelf = 'none'
                }
              }
            }
            return book
          })
          this.setState((state) => {
            state.searchedBooks = data
          })
        } else {
          this.setState((state) => {
            state.searchedBooks = []
          })
        }
      })
    }
  }

  // Lifecycle event - invoked immediately after the component is mounted
  // get the list of books to be displayed in shelf on main page and update the state
  componentDidMount() {
    BooksAPI.getAll().then((data) => {
      data.forEach((book) => {
        this.setState((state) => {
          state.shelves[book.shelf].books.push(book);
        })
      })
    })
  }

 // Render function that renders 2 child components BookShelves and SearchBook
  render() {
    const { shelves, searchedBooks } = this.state
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <BookShelves 
            booksInShelves={shelves}
            onMoveBook={this.moveBook} />
        )} />
        <Route path="/search" render={() => (
          <SearchBook 
            searchedBooks={searchedBooks}
            onMoveBook={this.moveBook}
            onSearchBooks={this.searchBooks} />
        )} />
      </div>
    )
  }
}

export default BooksApp
