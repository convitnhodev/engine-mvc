const db = require('./config/db');

(async () => {
  try {
    const result = await db.query('SELECT 1');
    console.log('Database connected successfully:', result);
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
  } finally {
    db.$pool.end(); 
  }
})();
