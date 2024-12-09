const Movie = require('../models/movie');
const Reivew = require('../models/review');
const Celebrity = require('../models/celebrity');

const movie_controller = {
   getAllMovies : async (req,res)=>{
   try{
   const movies = await Movie.getAll();
   res.json({message: 'Get movies successfully.', status: 200, data: movies});
   }catch(error){
    res.json({message: 'Error Internal Server.', status: 500});
   }
  },
  getTopRankedMovies : async (req,res)=>{
    try{
        const model = new Movie();
    const movies = await model.getTopRank();
    return movies
    }catch(error){
        throw new Error(error.message);
    }
   },
   getTopRevenueMovies : async ()=>{
    try{
    const model = new Movie();
    const movies = await model.getTopRevenue();
    return movies;
    }catch(error){
     throw new Error(error.message);
    }
   },

   getFavourtieMovies : async ()=>{
    try{
    const model = new Movie();
    const movies = await model.getFavourite();
    return movies;
    }catch(error){
     throw new Error(error.message);
    }
   },

   countSearch : async (search)=>{
    try{
    const model = new Movie();
    const number = await model.countAllBySearch(search);
    return number;
    }catch(error){
     throw new Error(error.message);
    }
   },
   searchMovies : async (search, pageIndex, pageSize)=>{
    try{
    const model = new Movie();
    const movies = await model.getMoviesBySearch(pageIndex, pageSize, search);
    return movies;
    }catch(error){
     throw new Error(error.message);
    }
   },
   getReviewByMovieId : async (movieId) =>{
    try{
        const model = new Reivew();
        const reviews = await model.getAllByMovieId(movieId);
        return reviews;
        }catch(error){
         throw new Error(error.message);
        }
   },
   getMovieById : async (movieId) =>{
    try{
        const model = new Movie();
        const movie = await model.getDetailById(movieId);
        return movie;
        }catch(error){
         throw new Error(error.message);
        }
   },
   getActorByMovieId : async (movieId) =>{
    try{
        const model = new Celebrity();
        const celebrities = await model.getActorByMovieId(movieId);
        return celebrities;
        }catch(error){
         throw new Error(error.message);
        }
   },
}

module.exports = movie_controller;