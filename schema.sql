DROP DATABASE IF EXISTS products;

CREATE DATABASE IF NOT EXISTS products;

\c products;

CREATE TABLE IF NOT EXISTS products  (
  product_id INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  product_name CHARACTER VARYING(30) NOT NULL,
  slogan CHARACTER VARYING(150) NOT NULL,
  description CHARACTER VARYING(500) NOT NULL,
  category CHARACTER VARYING(25) NOT NULL,
  default_price CHARACTER VARYING (7) NOT NULL
);

CREATE TABLE IF NOT EXISTS features (
  feature_id INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  product_id INTEGER,
  feature_name CHARACTER VARYING(30),
  feature_value CHARACTER VARYING(30),
  FOREIGN KEY (product_id) REFERENCES products (product_id)
);


CREATE TABLE IF NOT EXISTS styles (
  style_id INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  product_id INTEGER NOT NULL,
  style_name CHARACTER VARYING (30),
  original_price CHARACTER VARYING(10) NOT NULL,
  sale_price CHARACTER VARYING(10) NOT NULL DEFAULT 0,
  default_style BOOLEAN,
  FOREIGN KEY (product_id) REFERENCES products (product_id)
);

CREATE TABLE IF NOT EXISTS photos (
  photo_id INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  style_id INTEGER,
  thumbnail_url TEXT,
  url TEXT,
  FOREIGN KEY (style_id) REFERENCES styles (style_id)
);

CREATE TABLE IF NOT EXISTS skus (
  sku_id INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  style_id INTEGER,
  quantity INTEGER,
  size CHARACTER VARYING(10),
  FOREIGN KEY (style_id) REFERENCES styles (style_id)
);

CREATE TABLE IF NOT EXISTS related_products (
  related_id INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  current_product_id INTEGER,
  related_product_id INTEGER
);


COPY products(product_id, product_name, slogan, description, category, default_price)
FROM '/Users/jasonchiou/HR/SDC Data/product.csv'
DELIMITER ','
CSV HEADER;

COPY features(feature_id, product_id, feature_name, feature_value)
FROM '/Users/jasonchiou/HR/SDC Data/features.csv'
DELIMITER ','
CSV HEADER;

COPY styles(style_id, product_id, style_name, sale_price, original_price, default_style)
FROM '/Users/jasonchiou/HR/SDC Data/styles.csv'
DELIMITER ','
CSV HEADER;

COPY photos(photo_id, style_id, url, thumbnail_url)
FROM '/Users/jasonchiou/HR/SDC Data/photos.csv'
DELIMITER ','
CSV HEADER;

COPY skus(sku_id, style_id, size, quantity)
FROM '/Users/jasonchiou/HR/SDC Data/skus.csv'
DELIMITER ','
CSV HEADER;

