
const Celebrity = require('../models/celebrity');

const celebrity_controller = {
   getAllCelebrities : async (req,res)=>{
   try{
   const movies = await Celebrity.getAll();
   res.json({message: 'Get movies successfully.', status: 200, data: movies});
   }catch(error){
    res.json({message: 'Error Internal Server.', status: 500});
   }
  },
   getCelebrityById : async (movieId) =>{
    try{
        const model = new Celebrity();
        const movie = await model.getDetailById(movieId);
        return movie;
        }catch(error){
         throw new Error(error.message);
        }
   },
   
}

module.exports = celebrity_controller;