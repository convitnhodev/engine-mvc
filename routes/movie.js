const express = require('express');
const movie_router = express.Router();
const sample_template = require('../views/tempale');

movie_router.get('/', (req, res) => {
  res.send(sample_template);
});

module.exports = movie_router;
