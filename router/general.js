const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();




public_users.post("/register", (req,res) => {
  let username = req.body.username;
  let password = req.body.password;
  if (!username || !password) {
    res.status(400).json({message: "Username and password are required"});
  }
  if (users[username]) {
    res.status(400).json({message: "Username already exists"});
  }
  users[username] = password;
  res.status(200).json({message: "User registered successfully"});
  isValid(username);
});

// Get the book list available in the shop

public_users.get('/',function (req, res) {
  const booksf = JSON.stringify(books);
  res.send(booksf)
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  let isbn = req.params.isbn;
  let book = books[isbn];
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({message: "Book not found"});
  }
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {

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
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
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
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {

  let isbn = req.params.isbn;
  let book = books[isbn];
  if (book) {
    res.status(200).json(book.reviews);
  } else {
    res.status(404).json({message: "Book not found"});
  }
});

module.exports.general = public_users;
