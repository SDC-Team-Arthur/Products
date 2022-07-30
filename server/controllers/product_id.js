const {pool} = require('../../db/index.js')

const get = (req, res) => {
  console.log('product_id\'s get request');
  console.log(req.params);
  const product_id = req.params.product_id;
  const queryString =
  `SELECT products.product_id AS id, products.product_name AS name, products.slogan, products.description, products.category, products.default_price, (SELECT JSON_AGG(JSON_BUILD_OBJECT('feature', features.feature_name, 'value', features.feature_value))) AS features
  FROM products
  INNER JOIN features
  ON products.product_id = features.product_id
  WHERE products.product_id = ${product_id}
  GROUP BY products.product_id`
  pool.query(queryString)
  .then((results) => {
    res.send(results.rows[0])
  })
  .catch((err) => {
    console.error(err);
  })

}

module.exports = {get}