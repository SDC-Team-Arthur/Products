const express = require('express');
const {pool} = require('../../db/index.js')
const Promise = require('bluebird');


const get = (req, res) => {
  const product_id = req.params.product_id;
  const queryString =
  `SELECT styles.style_id,
  styles.style_name AS name,
  styles.original_price,
  REPLACE(styles.sale_price, 'null', '0') AS sale_price,
  styles.default_style as "default?",
  (SELECT JSON_AGG(JSON_BUILD_OBJECT(
    'thumbnail_url', photos.thumbnail_url,
    'url', photos.url))
    FROM photos WHERE photos.style_id = styles.style_id) AS photos,

  (SELECT JSON_OBJECT_AGG(skus.sku_id, JSON_BUILD_OBJECT('quantity', skus.quantity, 'size', skus.size)) FROM skus WHERE skus.style_id = styles.style_id) AS skus
  FROM styles
  WHERE styles.product_id = ${product_id}
  GROUP BY styles.style_id`


  pool.query(queryString)
  .then((results) => {
    const finalObj = {
      product_id: product_id,
      results: results.rows
    }
    res.send(finalObj)
  })
  .catch((err) => {
    console.error(err);
  })
}


module.exports = {get};