const Movie = require('../models/movie');

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
    const movies = await Movie.getTopRank();
    res.json({message: 'Get top ranked movies successfully.', status: 200, data: movies});
    }catch(error){
     res.json({message: 'Error Internal Server.', status: 500});
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
}

module.exports = movie_controller;