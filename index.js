// index.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// app.use(cors());

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: 'https://personal-bookshelf-frontend.vercel.app',
  methods: ['GET', 'POST'],
  headers: ['Authorization'],
  credentials: true,
  optionsSuccessStatus: 204
}));

app.use(function (request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json());

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error('MONGODB_URI is not defined');
  process.exit(1); // Exit the process with a failure code
}

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB', error);
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

const booksRouter = require('./routes/books');
app.use('/books', booksRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
