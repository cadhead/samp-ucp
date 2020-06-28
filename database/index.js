const mysql = require('mysql');
const config = require('../config').database;

// function execQuery(cb) {
//   return new Promise((resolve, reject) => {
//     cb(resolve, reject);
//   });
// }

class DatabaseService {
  constructor() {
    this.pool = mysql.createPool(config);
    this.config = config;
  }

  getConnection(cb) {
    return this.pool.getConnection(cb);
  }

  query(sql, data) {
    return new Promise((resolve, reject) => {
      this.getConnection((err, connection) => {
        if (err) throw reject(err);

        connection.query(sql, data, (dataError, result) => {
          connection.release();

          if (dataError) reject(dataError);

          resolve(result);
        });
      });
    });
  }

  destroyConnection() {
    this.pool.end(err => {
      if (err) throw err;

      return true;
    });
  }
}

module.exports = new DatabaseService();
