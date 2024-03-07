const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ 
  if (username.length < 5 || username.length > 10) {
    return false;
  }
  return true;
}

const authenticatedUser = (username,password)=>{
  if (users[username] === password) {
    return true;
  }
  return false;
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  let username = req.body.username;
  let password = req.body.password;
  if (!username || !password) {
    res.status(400).json({message: "Username and password are required"});
  }
  if (!isValid(username)) {
    res.status(400).json({message: "Username is invalid"});
  }
  if (!authenticatedUser(username,password)) {
    res.status(400).json({message: "Username or password is invalid"});
  }
  req.session.user = username;
  let token = jwt.sign({username: username}, "fingerprint_customer");
  res.status(200).json({token: token});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  let isbn = req.params.isbn;
  let review = req.body.review;
  let book = books[isbn];
  if (!book) {
    res.status(404).json({message: "Book not found"});
  }
  if (!review) {
    res.status(400).json({message: "Review is required"});
  }
  book.reviews.push(review);
  res.status(200).json({message: "Review added successfully"});
});

// Complete the code for adding or modifying a book review.

regd_users.post("/auth/review/:isbn", (req, res) => {
  let isbn = req.params.isbn;
  let review = req.body.review;
  let book = books[isbn];
  if (!book) {
    res.status(404).json({message: "Book not found"});
  }
  if (!review) {
    res.status(400).json({message: "Review is required"});
  }
  book.reviews.push(review);
  res.status(200).json({message: "Review added successfully"});
}
);

// Complete the code for deleting a book review under

regd_users.delete("/auth/review/:isbn", (req, res)=>{
  let isbn = req.params.isbn;
  let review = req.body.review;
  let book = books[isbn];
  if (!book) {
    res.status(404).json({message: "Book not found"});
  }
  if (!review) {
    res.status(400).json({message: "Review is required"});
  }
  book.reviews.pop(review);
  res.status(200).json({message: "Review deleted successfully"});
})

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
