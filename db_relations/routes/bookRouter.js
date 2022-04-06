const express = require('express')
const bookRouter = express.Router()
const Book = require('../models/book')

// Get All
bookRouter.get('/', (req, res, next) => {
    Book.find((err, books) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(books)
    })
})

// Get by Author
bookRouter.get('/:authorId', (req, res, next) => {
    Book.find({ author: req.params.authorId }, (err, books) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(books)
    })
})

// Add new book
bookRouter.post('/:authorId', (req, res, next) => {
    req.body.author = req.params.authorId
    const newBook = new Book(req.body)
    newBook.save((err, book) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(book)
    })
})

module.exports = bookRouter