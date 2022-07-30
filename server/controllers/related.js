const express = require('express');
const {pool} = require('../../db/index.js')
const Promise = require('bluebird');


const get = (req, res) => {
  console.log('products.get was invoked,', req.params)
  const numPages = req.params.page || 1;
  const count = req.params.count || 5;
  const product_id = req.params.product_id;

  const queryString = `SELECT JSON_AGG(related_products.related_product_id) FROM related_products WHERE related_products.current_product_id = ${product_id}`

  pool.query(queryString)
  .then((results) => {
    res.send(results.rows[0].json_agg);
  })
  .catch((err) => {
    console.error(err);
  })

}


module.exports = {get};