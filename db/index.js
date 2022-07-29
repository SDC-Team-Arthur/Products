const postgresql = require('pg');
// const os = require('os')

const pool = new postgresql.Pool({
      user: '',
      database: 'products',
      password: '',
      host:'127.0.0.1',
      port: 5432
    });



module.exports = {pool};