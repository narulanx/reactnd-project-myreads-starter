import React from 'react'
import { Link } from 'react-router-dom'

class BookShelves extends React.Component {

  // Render function to display the books in shelves using the properties passed from App.js
  render() {
    const { booksInShelves, onMoveBook } = this.props
    const shelves = Object.keys(booksInShelves)
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            { shelves.filter((shelf) => shelf !== 'none').map((shelf,index) => (
              <div key={index} className="bookshelf">
                <h2 className="bookshelf-title">{booksInShelves[shelf].name}</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    { booksInShelves[shelf].books.map((book, i) => (
                      <li key={i}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" 
                              style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                            <div className="book-shelf-changer">
                              <select value={book.shelf} onChange={(event) => onMoveBook(book, event.target.value)}>
                                <option value="" disabled>Move to...</option>
                                { shelves.map((bookshelf, i) => (
                                  <option key={i} value={bookshelf}>{booksInShelves[bookshelf].name}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
                          { book.authors.map((author, j) => (
                            <div key={j} className="book-authors">{author}</div>
                          ))}
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default BookShelves