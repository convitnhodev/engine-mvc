const express = require('express');
const movie_router = express.Router();
const sample_template = require('../views/tempale');
const templateEngine = require('../20488');
const movie_controller = require('../controllers/movie-controller');
movie_router.get('/', async(req, res) => {
  const topRevenueMovies = await movie_controller.getTopRevenueMovies();
  const data ={
    homePage:`
  <div class="container-body">
  <div>
    <div id="movieCarousel" class="carousel slide" data-ride="carousel">
      <div class="carousel-inner">
        20488{for movie in topRevenueMovies}
        <div class="carousel-item" class="active" key="{movie.id}">
          <div class="d-flex justify-content-center" onclick="clickMovie({movie.id})">
            <img class="revenueItemImg" src="{movie.image}" class="d-block w-30" alt="{movie.fullftitle}" />
            <div class="movie-info movie-overlay mt-3">
              <h4>{movie.fullftitle}</h4>
            </div>
          </div>
        </div>
        {/for}
      </div>
    </div>
  </div>`,
    topRevenueMovies: topRevenueMovies,
  } 
  console.log(topRevenueMovies);
  var returned = templateEngine.render(sample_template,data);
  console.log(returned);
  res.send(returned);
});

movie_router.get('/favourite', async (req, res) => {
  try {
      const page = parseInt(req.query.page) || 1; 
      const limit = 10; 
      const offset = (page - 1) * limit;

      const movies = await Movie.getFavouriteMovies(offset, limit);  
      const totalMovies = await Movie.getTotalFavouriteMovies(); 
      const totalPages = Math.ceil(totalMovies / limit);

      const pageContent = `
          <div class="container-body container">
              <div v-if="error">{{ error }}</div>
              <div v-if="loading" class="loading-container">
                  <div class="loader"></div>
              </div>
              <div v-else> 
                  <div class="row">
                      ${movies.map(movie => `
                          <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key="${movie.id}">
                              <div class="item-search-container" onclick="clickMovie(${movie.id})">
                                  <img src="${movie.image}" alt="Movie Image" />
                                  <div class="info-card">
                                      <h4>${movie.fullTitle}</h4>
                                      <p>${movie.genre}</p>
                                  </div>
                              </div>
                          </div>
                      `).join('')}
                  </div>
                  <div class="pagination-container">
                      <button class="btn-search" ${page === 1 ? 'disabled' : ''} onclick="changePage(${page - 1})">Prev</button>
                      <span>${page} / ${totalPages}</span>
                      <button class="btn-search" ${page === totalPages ? 'disabled' : ''} onclick="changePage(${page + 1})">Next</button>
                  </div>
              </div>
          </div>
      `;

      res.send(pageContent); 
  } catch (error) {
      console.error("Error fetching favourite movies", error);
      res.status(500).send("Internal Server Error");
  }
});


module.exports = movie_router;
