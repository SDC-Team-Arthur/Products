const express = require('express');
const {pool} = require('../../db/index.js')
const Promise = require('bluebird');


const get = (req, res) => {
  const numPages = req.query.page || 1;
  const count = req.query.count || 5;
  const offset = count * (numPages - 1)

  const query = `WITH products AS (SELECT product_id AS id, product_name AS name, slogan, description, category, default_price FROM products LIMIT ${count} OFFSET ${offset}) SELECT JSON_AGG(products.*) FROM products`

  pool.query(query)
  .then((results) => {
    res.send(results.rows[0].json_agg);
  })
  .catch((err) => {
    console.error(err);
  })

}
//


module.exports = {get};