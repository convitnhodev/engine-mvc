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
   getTopRevenueMovies : async (req,res)=>{
    try{
    const movies = await Movie.getTopRevenue();
    res.json({message: 'Get top ranked movies successfully.', status: 200, data: movies});
    }catch(error){
     res.json({message: 'Error Internal Server.', status: 500});
    }
   },
}

module.exports = movie_controller;