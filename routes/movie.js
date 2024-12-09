const express = require('express');
const movie_router = express.Router();
const sample_template = require('../views/tempale');
const templateEngine = require('../20488');
const movie_controller = require('../controllers/movie-controller');
const review_controller = require('../controllers/review-controller');
const { redirect } = require('express/lib/response');
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
          <div class="d-flex justify-content-center" onclick="window.location.href='/movies/{movie.id}'">
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
    isHomePage: true,
  } 
  console.log(topRevenueMovies);
  var returned = templateEngine.render(sample_template,data);
  console.log(returned);
  res.send(returned);
});

movie_router.get('/favourite', async (req, res) => {
  try {
      const movies = await movie_controller.getFavourtieMovies();  

      const favourite = `
      <h1>Favourite Movies</h1>
          <div class="container-body container">
                  <div class="row">
                       20488{for movie in movies}
                          <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key="{movie.id}">
                              <div class="item-search-container" onclick="window.location.href='/movies/{movie.id}'">
                                  <img src="{movie.image}" alt="Movie Image" />
                                  <div class="info-card">
                                      <h4>{movie.fullftitle}</h4>
                                      <p>Rating:{movie.im_db_rating}</p>
                                  </div>
                              </div>
                          </div>
                      {/for}
                  </div>
           </div>
          </div>
      `;

      const data ={
        favourite: favourite, 
        isFavourite: true, 
        movies: movies
      }

      var returned = templateEngine.render(sample_template,data);
      res.send(returned); 
  } catch (error) {
      console.error("Error fetching favourite movies", error);
      res.status(500).send("Internal Server Error");
  }
});


movie_router.get('/search', async (req, res) => {
  try {
      const pageIndex = parseInt(req.query.page) || 1;  
      const search = req.query.search || '';   
      console.log(search);
      const limit = 10;  
      const offset = (pageIndex - 1) * limit;  

      const movies = await movie_controller.searchMovies(search, pageIndex, limit);  
      const totalMovies = await movie_controller.countSearch(search);  
      const totalPages = Math.ceil(totalMovies / limit); 

      const searchPage = `
          <h1>Search Movies</h1>
          <div class="container-body container">
              <div class="row">
                  ${movies.map(movie => `
                      <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key="${movie.id}">
                          <div class="item-search-container" onclick="window.location.href='/movies/${movie.id}'">
                              <img src="${movie.image}" alt="Movie Image" />
                              <div class="info-card">
                                  <h4>${movie.fullftitle}</h4>
                                  <p>Rating: ${movie.im_db_rating}</p>
                              </div>
                          </div>
                      </div>
                  `).join('')}
              </div>
              <div class="pagination-container">
                  <button class="btn-search" ${pageIndex === 1 ? 'disabled' : ''} onclick="()=>{
                    
                    redirect('/movies/search?page=${pageIndex-1} && search=${search}')

                    }">Prev</button>
                  <span>${pageIndex} / ${totalPages}</span>
                  <button class="btn-search" ${pageIndex === totalPages ? 'disabled' : ''} onclick="()=>{
                    redirect('/movies/search?page=${pageIndex-1} && search=${search}')
                    }">Next</button>
              </div>
          </div>
      `;

      const data = {
          searchPage: searchPage,
          isSearch: true,
          movies: movies
      };

      var returned = templateEngine.render(sample_template, data);
      res.send(returned); 
  } catch (error) {
      console.error("Error fetching search movies", error);
      res.status(500).send("Internal Server Error");
  }
});

movie_router.get('/:id', async function (req, res) {
  try {
    const movieId = req.params.id;
    console.log(movieId);

    const movie = await movie_controller.getMovieById(movieId);

    const actors = await movie_controller.getActorByMovieId(movieId);

    const reviews = await movie_controller.getReviewByMovieId(movieId);

    const movieDetail = `
      <div class="container-body">
        <div>
          <h2>General Information</h2>
          <div class="basic-information-container">
            <img class="revenueItemImg" src="${movie?.image}" class="d-block w-30" alt="${movie.fullftitle}">
            <div class="basic-information">
              <div class="basic-information-item"><h4>Full Title:</h4><p>${movie.fullftitle}</p></div>
              <div class="basic-information-item"><h4>Release Date:</h4><p>${movie.release_date}</p></div>
              <div class="basic-information-item"><h4>Run Time:</h4><p>${movie.runtime_str}</p></div>
              <div class="basic-information-item"><h4>Plot:</h4><p>${movie.plot}</p></div>
              <div class="basic-information-item"><h4>Companies:</h4><p>${movie.companies}</p></div>
              <div class="basic-information-item"><h4>Languages:</h4><p>${movie.languages}</p></div>
              <div class="basic-information-item"><h4>Rating:</h4><p>${movie.im_db_rating}</p></div>
            </div>
          </div>

          <h2>Actors</h2>
          <div id="actorCarousel" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner top-rating-caursol-inner">
              ${actors.map((actor, index) => `
                <div class="carousel-item top-rating-caursol-item ${index === 0 ? 'active' : ''}">
                  <div class="d-flex justify-content-around" onclick="window.location.href='/actors/${actor.id}'" >
                    <div class="top-rating-movie-item"  >
                      <img src="${actor.image}" class="d-block w-30" alt="${actor.name}">
                      <div class="mt-3"><h4>${actor.name}</h4></div>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
            <a class="carousel-control-prev" href="#actorCarousel" role="button" data-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#actorCarousel" role="button" data-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </a>
          </div>

          <h2>Reviews</h2>
          <h3>Submit Your Review</h3>
<form id="reviewForm" method="POST" action="/movies/${movie.id}/reviews">
  

<div class="form-group">
<label for="username">Username</label>
<input type="text" id="username" name="username" class="form-control" required />
</div>
  <div class="form-group">
    <label for="title">Title</label>
    <input type="text" id="title" name="title" class="form-control" required />
  </div>
  
  <div class="form-group">
    <label for="content">Review Content</label>
    <textarea id="content" name="content" class="form-control" rows="4" required></textarea>
  </div>

  <div class="form-group">
    <label for="rating">Rating</label>
    <select id="rating" name="rating" class="form-control" required>
      <option value="1">1 Star</option>
      <option value="2">2 Stars</option>
      <option value="3">3 Stars</option>
      <option value="4">4 Stars</option>
      <option value="5">5 Stars</option>
      <option value="6">6 Stars</option>
      <option value="7">7 Stars</option>
      <option value="8">8 Stars</option>
      <option value="9">9 Stars</option>
      <option value="10">10 Stars</option>
    </select>
  </div>

  <button type="submit" class="btn btn-primary">Submit Review</button>
</form>

<div id="reviewSuccessMessage" class="alert alert-success" style="display: none;">Review submitted successfully!</div>
<div id="reviewErrorMessage" class="alert alert-danger" style="display: none;">Error submitting review. Please try again.</div>
          <div>
            ${reviews.map(review => `
              <div class="review-container">
                <div class="review-item">
                  <p><span>${review.username}</span> - ${review.date}</p>
                  <h2>${review.title}</h2>
                  <div class="star-rating">
                    <span class="star fa fa-star ${review.rate >= 2 ? 'checked' : ''}"></span>
                    <span class="star fa fa-star ${review.rate >= 4 ? 'checked' : ''}"></span>
                    <span class="star fa fa-star ${review.rate >= 6 ? 'checked' : ''}"></span>
                    <span class="star fa fa-star ${review.rate >= 8 ? 'checked' : ''}"></span>
                    <span class="star fa fa-star ${review.rate >= 10 ? 'checked' : ''}"></span>
                  </div>
                  <p>${review.content}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
    const data={
      movieDetailPage : movieDetail, 
      isMovieDetail : true,
    }
    const returned = templateEngine.render(sample_template, data);

    res.send(returned);
  } catch (error) {
    console.error("Error fetching movie details:", error);
    res.status(500).send("Internal Server Error");
  }
});
movie_router.post('/:id/reviews', async function (req, res) {
  try {
    const movieId = req.params.id;
    const { title, content, rating, username } = req.body;
    
    console.log(title, content, rating, username);
   
    if (!title || !content || !rating || !username) {
      return res.status(400).json({ message: 'all field required' });
    }

    const result =  await review_controller.postReview (username, content, title , rating, movieId);
    var message="Review successfully created";
    return res.redirect('/movies/' + movieId+ '?message=message')
  } catch (error) {
    console.error('Error submitting review:', error);
    res.status(500).json({ message: 'Error submitting review. Please try again.' });
  }
});

module.exports = movie_router;
