const postgresql = require('pg');
// const os = require('os')

require('dotenv').config();


const pool = new postgresql.Pool({
      user: process.env.PGUSER,
      database: process.env.PGDATABASE,
      password: process.env.PGPASSWORD,
      host: process.env.PGHOST,
      port: process.env.PGPORT
    });



module.exports = {pool};