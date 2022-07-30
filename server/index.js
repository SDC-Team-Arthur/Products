
const {url, PORT} = require('../config.js');
const express = require('express');
const path = require('path');
const controllers = require('./controllers')



const app = express();
app.use(express.json());

app.get('/products', controllers.products.get)

app.get('/products/:product_id', controllers.product_id.get);

app.get('/styles/:product_id', controllers.styles.get);


app.listen(PORT);
console.log(`Server listening at http://localhost:${PORT}`);
