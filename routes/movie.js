const express = require('express');
const movie_router = express.Router();

movie_router.get('/', (req, res) => {
  res.send('Welcome to the Node.js app!');
});

module.exports = movie_router;
