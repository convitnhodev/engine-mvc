const express = require('express');
const router = express.Router();
const movie_router = require('./movie');


router.use('/movies', movie_router);


router.get('/', (req, res) => {
 res.Redirect('/movies');
});

module.exports = router;
