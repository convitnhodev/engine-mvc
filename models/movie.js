const db = require('../config/db');

class Movie {
   
    async getAll(){
        try
        {
        const movies = await db.any("SELECT * FROM movie");
        return movies;
        } catch (error) 
        {
          console.error("Error query movies", error);
          throw new Error("Error getting movies");
        }  
    }

    async getTopRank(){
      try{
        const movies = await db.any("SELECT * FROM movie ORDER BY im_db_rating DESC LIMIT 50");
        return movies;
       }catch (error)   {
        console.error("Error query top ranked movies" ,error);
        throw new Error("Error getting top ranked movies");
       } 
    }
    async getTopRevenue() {
        try {
          const movies = await db.any(
            `SELECT * 
           FROM movies
           ORDER BY CAST(REPLACE(REPLACE(cumulativeWorldwideGross, '$', ''), ',', '') AS NUMERIC) DESC
           LIMIT 50`
          );
          return movies;
        } catch (error) {
          console.error("Error fetching top revenue movies:", error);
          throw new Error("Failed to fetch top revenue movies.");
        }
      }
}

module.exports = Movie