const db = require('../config/db');

class Celebrity {
   
    async getAll(){
        try
        {
        const celebrities = await db.any("SELECT * FROM s20488.celebrity");
        return celebrities;
        } catch (error) 
        {
          console.error("Error query celebrities", error);
          throw new Error("Error getting celebrities", error);
        }  
    }
    async countAllBySearch(search) {
      try {
          const query = `
              SELECT COUNT(*) 
              FROM s20488.celebrity 
              WHERE LOWER(name) LIKE LOWER($1)
          `;
          const result = await db.one(query, [`%${search}%`]);
          return result.count;
      } catch (error) {
          console.error("Error counting celebrity", error);
          throw new Error("Error counting celebrity");
      }
     }
  
   async getCelebritiessBySearch(pageNumber, pageSize, search ) {
    try {
        const offset = (pageNumber - 1) * pageSize;
        const query = `
            SELECT * 
            FROM s20488.celebrity 
            WHERE LOWER(name) LIKE '%' || LOWER($1) || '%'
            LIMIT $2 OFFSET $3
        `;
        const movies = await db.any(query, [`${search}`, pageSize, offset]);
        return movies;
    } catch (error) {
        console.error("Error querying celebrities", error);
        throw new Error("Error getting celebrities");
    }
}
      async getDetailById(id) {
        try {
          const movies = await db.oneOrNone(
            `SELECT * 
           FROM s20488.celebrity
           WHERE id = ${id}`
          );
          return movies;
        } catch (error) {
          console.error("Error fetching favourite movies:", error);
          throw new Error("Failed to fetch favourite movies.");
        }

      }
    
}

module.exports = Movie