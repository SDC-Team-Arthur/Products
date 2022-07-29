const express = require('express');
const {pool} = require('../../db/index.js')


const get = () => {
  pool.query('SELECT * FROM products', (err, res) => {
    if (err) {
      console.error(err);
    } else {
      console.log(res);
    }
  })
  pool.end();
}

module.exports = {get};