const express = require('express');
const router = express.Router();
const movie_router = require('./movie');
const celebrity_router = require('./celebrity');


router.use('/movies', movie_router);
router.use("/actors", celebrity_router);

router.get('/', (req, res) => {
 res.redirect('/movies');
});

module.exports = router;
