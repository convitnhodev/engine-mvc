require('dotenv').config();
const pgp = require('pg-promise')();

const db = pgp({
  host: 'localhost',
  port: 5433,
  database: 'wad2231db',
  user: 'u20120488',
  password: '5G*4p3DL',
});

module.exports = db;
