const mysql = require("mysql");
const config = require("../config").database;

class DatabaseService {
  constructor() {
    this.pool = mysql.createPool(config);
    this.config = config;
  }

  getConnection(cb) {
    return this.pool.getConnection(cb);
  }

  query(sql, data) {
    return this.__execQuery((resolve, reject) => {
      this.pool.getConnection((err, connection) => {
        if (err) throw reject(err);

        connection.query(sql, data, (err, result) => {
          connection.release();

          if (err) throw reject(err);
          
          resolve(result);
        })
      });
    });
  }

  destroyConnection() {
    this.pool.end(err => err ? console.error(err) : true);
  }

  __execQuery(cb) {
    return new Promise((resolve, reject) => cb(resolve, reject));
  }
}

module.exports = new DatabaseService();
