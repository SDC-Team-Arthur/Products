const express = require('express');
const {pool} = require('../../db/index.js')
const Promise = require('bluebird');


const get = (req, res) => {
  console.log('styles.get was invoked');
  console.log(req.params.product_id);
  const product_id = req.params.product_id;
  const queryString =
  `SELECT styles.style_id, styles.style_name AS name, styles.original_price, styles.sale_price, styles.default_style as "default?", (SELECT JSON_AGG(JSON_BUILD_OBJECT('thumbnail_url', photos.thumbnail_url, 'url', photos.url))) AS photos, (SELECT JSON_OBJECT_AGG(skus.sku_id, JSON_BUILD_OBJECT('quantity', skus.quantity, 'size', skus.size))) AS skus, REPLACE(styles.sale_price, 'null', '0')
  FROM styles
  INNER JOIN photos
  ON styles.style_id = photos.style_id
  INNER JOIN skus
  ON skus.style_id = styles.style_id
  WHERE styles.product_id = ${product_id}
  GROUP BY styles.style_id, skus.style_id`

  pool.query(queryString)
  .then((results) => {
    res.send(results.rows[0])
  })
  .catch((err) => {
    console.error(err);
  })
}


module.exports = {get};