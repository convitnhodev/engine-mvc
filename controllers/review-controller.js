const Movie = require('../models/movie');
const Review = require('../models/review');
const Celebrity = require('../models/celebrity');

const review_controller = {
   postReview : async ({username, content, title, rating, movie_id}) =>{
    try{
        const model = new Review();
        const review = await model.postReview(username, content, title, rating, movie_id);
        return review;
        }catch(error){
         throw new Error(error.message);
        }
   },
}

module.exports = review_controller;