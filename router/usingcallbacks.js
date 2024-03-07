const express = require('express');
let books = require("./booksdb.js");
const public_users = express.Router();


// Get the book list available in the shop
public_users.get('/', async (req, res) => {
  try {
    const booksf = JSON.stringify(books);
    res.send(booksf);
  } catch (error) {
    res.status(500).json({message: "Internal Server Error"});
  }
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', async (req, res) => {
  try {
    let isbn = req.params.isbn;
    let book = books[isbn];
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({message: "Book not found"});
    }
  } catch (error) {
    res.status(500).json({message: "Internal Server Error"});
  }
});
  
// Get book details based on author
public_users.get('/author/:author', async (req, res) => {
  try {
    let author = req.params.author;
    let book = [];
    for (let i in books) {
      if (books[i].author === author) {
        book.push(books[i]);
      }
    }
    if (book.length > 0) {
      res.status(200).json(book);
    } else {
      res.status(404).json({message: "Book not found"});
    }
  } catch (error) {
    res.status(500).json({message: "Internal Server Error"});
  }
});

// Get all books based on title
public_users.get('/title/:title', async (req, res) => {
  try {
    let title = req.params.title;
    let book = [];
    for (let i in books) {
      if (books[i].title === title) {
        book.push(books[i]);
      }
    }
    if (book.length > 0) {
      res.status(200).json(book);
    } else {
      res.status(404).json({message: "Book not found"});
    }
  } catch (error) {
    res.status(500).json({message: "Internal Server Error"});
  }
});

// Get book review
public_users.get('/review/:isbn', async (req, res) => {
  try {
    let isbn = req.params.isbn;
    let book = books[isbn];
    if (book) {
      res.status(200).json(book.reviews);
    } else {
      res.status(404).json({message: "Book not found"});
    }
  } catch (error) {
    res.status(500).json({message: "Internal Server Error"});
  }
});

module.exports.general = public_users;
