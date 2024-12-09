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
    async countAllBySearch(search) {
      try {
          const query = `
              SELECT COUNT(*) 
              FROM s20488.movie 
              WHERE LOWER(fullftitle) LIKE LOWER($1)
          `;
          const result = await db.one(query, [`%${search}%`]);
          return result.count;
      } catch (error) {
          console.error("Error counting movies", error);
          throw new Error("Error counting movies");
      }
     }
  
   async getMoviesBySearch(pageNumber, pageSize, search ) {
    try {
        const offset = (pageNumber - 1) * pageSize;
        const query = `
            SELECT * 
            FROM s20488.movie 
            WHERE LOWER(fullftitle) LIKE '%' || LOWER($1) || '%'
            LIMIT $2 OFFSET $3
        `;
        const movies = await db.any(query, [`${search}`, pageSize, offset]);
        return movies;
    } catch (error) {
        console.error("Error querying movies", error);
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
    async getTopRevenue () {
        try {
          const movies = await db.any(
            `SELECT * 
           FROM s20488.movie
           ORDER BY CAST(REPLACE(REPLACE(cumulative_world_wide_gross, '$', ''), ',', '') AS NUMERIC) DESC
           LIMIT 50`
          );
          return movies;
        } catch (error) {
          console.error("Error fetching top revenue movies:", error);
          throw new Error("Failed to fetch top revenue movies.");
        }
      }
      async getFavourite () {
        try {
          const movies = await db.any(
            `SELECT * 
           FROM s20488.movie
           WHERE favourite = TRUE`
          );
          return movies;
        } catch (error) {
          console.error("Error fetching favourite movies:", error);
          throw new Error("Failed to fetch favourite movies.");
        }
      }
    
}

module.exports = Movie