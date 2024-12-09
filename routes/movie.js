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
                              <div class="item-search-container" onclick="clickMovie({movie.id})">
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

movie_router.get('/favourite', async (req, res) => {
  try {
      // Lấy các tham số query từ URL
      const page = parseInt(req.query.page) || 1;  // Mặc định là trang 1
      const searchQuery = req.query.search || '';   // Lấy từ query "search" (nếu có)
      const limit = 10;  // Số lượng movie mỗi trang
      const offset = (page - 1) * limit;  // Xác định vị trí bắt đầu lấy dữ liệu

      // Lấy dữ liệu movie từ database với tìm kiếm và phân trang
      const movies = await movie_controller.getFavouriteMovies(searchQuery, offset, limit);  // Tìm kiếm và phân trang
      const totalMovies = await movie_controller.getTotalFavouriteMovies(searchQuery);  // Tổng số movie với tìm kiếm
      const totalPages = Math.ceil(totalMovies / limit);  // Tính toán tổng số trang

      // Render trang với dữ liệu
      const favourite = `
          <h1>Favourite Movies</h1>
          <div class="container-body container">
              <div class="row">
                  ${movies.map(movie => `
                      <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key="${movie.id}">
                          <div class="item-search-container" onclick="clickMovie(${movie.id})">
                              <img src="${movie.image}" alt="Movie Image" />
                              <div class="info-card">
                                  <h4>${movie.fullTitle}</h4>
                                  <p>Rating: ${movie.imDbRating}</p>
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
      `;

      const data = {
          favourite: favourite,
          isFavourite: true,
          movies: movies
      };

      var returned = templateEngine.render(sample_template, data);
      res.send(returned); 
  } catch (error) {
      console.error("Error fetching favourite movies", error);
      res.status(500).send("Internal Server Error");
  }
});
movie_router.get('/favourite', async (req, res) => {
  try {
      // Lấy các tham số query từ URL
      const page = parseInt(req.query.page) || 1;  // Mặc định là trang 1
      const searchQuery = req.query.search || '';   // Lấy từ query "search" (nếu có)
      const limit = 10;  // Số lượng movie mỗi trang
      const offset = (page - 1) * limit;  // Xác định vị trí bắt đầu lấy dữ liệu

      // Lấy dữ liệu movie từ database với tìm kiếm và phân trang
      const movies = await movie_controller.getFavouriteMovies(searchQuery, offset, limit);  // Tìm kiếm và phân trang
      const totalMovies = await movie_controller.getTotalFavouriteMovies(searchQuery);  // Tổng số movie với tìm kiếm
      const totalPages = Math.ceil(totalMovies / limit);  // Tính toán tổng số trang

      // Render trang với dữ liệu
      const favourite = `
          <h1>Favourite Movies</h1>
          <div class="container-body container">
              <div class="row">
                  ${movies.map(movie => `
                      <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key="${movie.id}">
                          <div class="item-search-container" onclick="clickMovie(${movie.id})">
                              <img src="${movie.image}" alt="Movie Image" />
                              <div class="info-card">
                                  <h4>${movie.fullTitle}</h4>
                                  <p>Rating: ${movie.imDbRating}</p>
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
      `;

      const data = {
          favourite: favourite,
          isFavourite: true,
          movies: movies
      };

      var returned = templateEngine.render(sample_template, data);
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
                          <div class="item-search-container" onclick="clickMovie(${movie.id})">
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


module.exports = movie_router;
