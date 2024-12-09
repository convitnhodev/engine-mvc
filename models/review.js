const db = require('../config/db');

class Review {
   
    async getAllByMovieId(id){
        try
        {
        const reviews = await db.any("SELECT * FROM s20488.review where movie_id = '"+id+"'",);
        return reviews;
        } catch (error) 
        {
          console.error("Error query reviews", error);
          throw new Error("Error getting reviews", error);
        }  
    }

    async postReview(username, rate, title, content, movieId ) {
        try {

            const currentDate = new Date();

            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
            const day = String(currentDate.getDate()).padStart(2, '0');

            const formattedDate = `${year}-${month}-${day}`;
            const query = `
                INSERT INTO s20488.review (username, warning_spoilers, date, rate, title, content, movie_id)
                VALUES ($1, $2, $3, $4, $5, $6, $7)
                RETURNING *;
            `;
    
            const values = [username, false, formattedDate, rate, title, content, movieId];
    
            const review = await db.one(query, values);
            return review;
        } catch (error) {
            console.error("Error posting review:", error);
            throw new Error("Failed to post review.");
        }
    }
    
}

module.exports = Review