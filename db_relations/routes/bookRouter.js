const express = require('express');
const bookRouter = express.Router();
const Book = require('../models/book');

// Get All
bookRouter.get('/', (req, res, next) => {
  Book.find((err, books) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(200).send(books);
  });
});

// Get by Author
bookRouter.get('/:authorId', (req, res, next) => {
  Book.find({ author: req.params.authorId }, (err, books) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(200).send(books);
  });
});

// Add new book
bookRouter.post('/:authorId', (req, res, next) => {
  req.body.author = req.params.authorId;
  const newBook = new Book(req.body);
  newBook.save((err, book) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(200).send(book);
  });
});

// Add like to book
bookRouter.put('/like/:bookId', (req, res, next) => {
  Book.findOneAndUpdate(
    { _id: req.params.bookId },
    { $inc: { likes: 1 }, $push: { likedBy: req.body.userId } },
    { new: true },
    (err, book) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      return res.status(200).send(book);
    }
  );
});

// Find book by likes range
bookRouter.get('/search/likes', (req, res, next) => {
    Book.where('likes').gte(req.query.min).lte(req.query.max).exec((err, books) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      return res.status(200).send(books);
    });
})

module.exports = bookRouter;
