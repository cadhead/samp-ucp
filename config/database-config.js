// const mysql = require('mysql');

const config = {
  connectionLimit: 12,
  charser: 'utf8',
  host: process.env.DBHOST,
  port: process.env.DBPORT,
  user: process.env.DBUSER,
  password: process.env.DBPASS,
  database: process.env.DATABASE
};

module.exports = config;
