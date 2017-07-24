This is the first project of Udacity's React Nanodegree program developed by [React Training](https://reacttraining.com). The goal of this project is to create a React project using create-react-app. In this project we had to create a bookshelf application where the list of books was retrieved using an API and they were divided in three categories - 'Currently Reading', 'Want to Read' and 'Read'. There is a search feature where we can search for list of books using title or author. Also, there was an ability to move a book within categories and the status is also persisted between main page and search page. 

## Installation
Make sure you have npm installed before downloading this project. Then, download the repository from github and run 'npm install'. Then run 'npm start' from within the project directory to start the server.

## Functionalities
* List of books are retrieved from backend server API which are defined below
* The books are categorized as 'Currently Reading', 'Want to Read' and 'Read'
* There is an ability to move books from one category to another
* The search page allows searching for the books based on author/title
* The status of a book is persisted between main page and search page

## React Features
* Project is created using create-react-app
* DOM elements are created using JSX
* Usage of both Stateless Functional Components and Controlled Components
* componentDidMount lifecycle event is used
* React router is used to navigate between main page and search page using 'react-router-dom'

## Backend Server

To simplify our development process, we were provided a backend server for us to develop against. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods we will need to perform necessary operations on the backend:

### `getAll()`
* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update(book, shelf)`
* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search(query, maxResults)`
* query: `<String>`
* maxResults: `<Integer>` Due to the nature of the backend server, search results are capped at 20, even if this is set higher.
* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results. 

## create-react-app

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Resources
* [React Facebook Library](https://facebook.github.io/react/)
* [React Express](http://www.react.express/)
* [React Training](https://reacttraining.com/)