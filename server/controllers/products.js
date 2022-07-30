const express = require('express');
const {pool} = require('../../db/index.js')
const Promise = require('bluebird');


const get = (req, res) => {
  console.log('products.get was invoked,', req.params)
  const numPages = req.params.page || 1;
  const count = req.params.count || 5;

  const queryString = `WITH products AS (SELECT product_id AS id, product_name AS name, slogan, description, category, default_price FROM products LIMIT ${count}) SELECT JSON_AGG(products.*) FROM products`

  pool.query(queryString)
  .then((results) => {
    res.send(results.rows[0].json_agg);
  })
  .catch((err) => {
    console.error(err);
  })

}


module.exports = {get};