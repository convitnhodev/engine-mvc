const db = require('../config/db');

class Review {
   
    async getAll(){
        try
        {
        const reviews = await db.any("SELECT * FROM s20488.review");
        return reviews;
        } catch (error) 
        {
          console.error("Error query reviews", error);
          throw new Error("Error getting reviews", error);
        }  
    }
    async postReview({ username, rate, title, content, movieId }) {
        try {
            const query = `
                INSERT INTO review (username, warning_spoilers, date, rate, title, content, movie_id)
                VALUES ($1, $2, $3, $4, $5, $6, $7)
                RETURNING *;
            `;
    
            const values = [username, false, Date(), rate, title, content, movieId];
    
            const review = await db.one(query, values);
            return review;
        } catch (error) {
            console.error("Error posting review:", error);
            throw new Error("Failed to post review.");
        }
    }
    
}

module.exports = Celebrity