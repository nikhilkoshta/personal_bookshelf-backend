// routes/books.js
const router = require('express').Router();
let Book = require('../models/book.model');

// Get all books
router.route('/', cors(corsOptions)).get((req, res) => {
  res.json({msg: 'This is CORS-enabled for only example.com.'})
  Book.find()
    .then(books => res.json(books))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Add a new book
router.route('/add').post((req, res) => {
  const title = req.body.title;
  const edition_count = req.body.edition_count;

  const newBook = new Book({ title, edition_count });

  newBook.save()
    .then(() => res.json('Book added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
