
DROP DATABASE IF EXISTS burritos_db;
CREATE DATABASE burritos_db;

USE burritos_db;


CREATE TABLE burritos(
  id INT AUTO_INCREMENT NOT NULL,
  burrito_name VARCHAR(30) NOT NULL,
  devoured BOOLEAN,
  PRIMARY KEY (id)
);