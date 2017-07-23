import React from 'react'
import { Link } from 'react-router-dom'

class SearchBook extends React.Component {
  // Lifecycle event - invoked immediately after the component is mounted
  // Reset the searched books to empty array if the search page is clicked again
  componentDidMount() {
    this.props.onSearchBooks('')
  }

  // Render function to display the searhed books based on entered query
  render() {
    const { searchedBooks, onMoveBook, onSearchBooks } = this.props
    return (
      <div className="app">
        <div className="search-books">
          <div className="search-books-bar">
            <Link to="/" className="close-search">Close</Link>
            <div className="search-books-input-wrapper">
              {/* 
                NOTES: The search from BooksAPI is limited to a particular set of search terms.
                You can find these search terms here:
                https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                
                However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                you don't find a specific author or title. Every search is limited by search terms.
              */}
              <input 
                type="text" 
                placeholder="Search by title or author"
                onChange={(event) => {onSearchBooks(event.target.value)}}/>
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              { searchedBooks.map((book, i) => (
                <li key={i}>
                  <div className="book">
                    <div className="book-top">
                      {book.imageLinks && 
                        <div className="book-cover" 
                          style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>}
                      <div className="book-shelf-changer">
                        <select value={book.shelf} onChange={(event) => onMoveBook(book, event.target.value)}>
                          <option value="" disabled>Move to...</option>
                          <option value="currentlyReading">Currently Reading</option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="read">Read</option>
                          <option value="none">None</option>
                        </select>
                      </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    { book.authors && book.authors.map((author, j) => (
                      <div key={j} className="book-authors">{author}</div>
                    ))}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    )
  }
}

export default SearchBook