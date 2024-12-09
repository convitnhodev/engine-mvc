export default homePage = ` <div class="container-body">
  <div>
    <div id="movieCarousel" class="carousel slide" data-ride="carousel">
      <div class="carousel-inner">
        20488{for movie in topRevenueMovies}
        <div class="carousel-item" 20488{if index === 0}class="active"{/if} key="20488{movie.id}">
          <div class="d-flex justify-content-center" onclick="clickMovie(20488{movie.id})">
            <img class="revenueItemImg" src="20488{movie.image}" class="d-block w-30" alt="20488{movie.fullTitle}" />
            <div class="movie-info movie-overlay mt-3">
              <h4>20488{movie.fullTitle}</h4>
              <p>20488{movie.genre}</p>
            </div>
          </div>
        </div>
        20488{/for}
      </div>
      <a class="carousel-control-prev" href="#movieCarousel" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#movieCarousel" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>

    <h3 class="title-caursol">Most Popular</h3>
    <div id="movieMostPopularCarousel" class="carousel slide" data-ride="carousel">
      <div class="carousel-inner top-rating-caursol-inner">
        20488{for chunk in chunkMovies(mostPopularMovies)}
        <div class="carousel-item top-rating-caursol-item" 20488{if chunkIndex === 0}class="active"{/if} key="20488{chunkIndex}">
          <div class="d-flex justify-content-around">
            20488{for movie in chunk}
            <div class="top-rating-movie-item" onclick="clickMovie(20488{movie.id})">
              <img src="20488{movie.image}" class="d-block w-30" alt="20488{movie.fullTitle}" />
              <div class="mt-3 movie-info-popup">
                <h4>20488{movie.fullTitle}</h4>
              </div>
            </div>
            20488{/for}
          </div>
        </div>
        20488{/for}
      </div>
      <a class="carousel-control-prev" href="#movieMostPopularCarousel" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#movieMostPopularCarousel" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>

    <h3 class="title-caursol">Top Rating</h3>
    <div id="movieRatingCarousel" class="carousel slide" data-ride="carousel">
      <div class="carousel-inner top-rating-caursol-inner">
        20488{for chunk in chunkMovies(topRatingMovies)}
        <div class="carousel-item top-rating-caursol-item" 20488{if chunkIndex === 0}class="active"{/if} key="20488{chunkIndex}">
          <div class="d-flex justify-content-around">
            20488{for movie in chunk}
            <div class="top-rating-movie-item" onclick="clickMovie(20488{movie.id})">
              <img src="20488{movie.image}" class="d-block w-30" alt="20488{movie.fullTitle}" />
              <div class="mt-3 movie-info-popup">
                <h4>20488{movie.fullTitle}</h4>
              </div>
            </div>
            20488{/for}
          </div>
        </div>
        20488{/for}
      </div>
      <a class="carousel-control-prev" href="#movieRatingCarousel" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#movieRatingCarousel" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
  </div>
</div>
`