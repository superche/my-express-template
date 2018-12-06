const mysql = require('mysql');
const _ = require('lodash');
const config = require('../config/db');

const pool = mysql.createPool(_.extend({}, config.mysql));

function getConnection() {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => err ? reject(err) : resolve(connection));
  });
}

async function query(sql, params) {
  return new Promise(async (resolve, reject) => {
    let conn;
    try {
      conn = await getConnection();
      conn.query(sql, [...params], (err, results, fields) => err ? reject(err) : resolve({
        results,
        fields,
      }));
    } catch (err) {
      reject(err);
    } finally {
      if (conn && conn.release) {
        conn.release();
      }
    }
  });
}

module.exports = {
  getConnection,
  query,
};
