const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 10,
  password: "Diamond116!",
  user: "jered",
  database: "icarus",
  host: "localhost",
  port: "3306",
});

let icarusdb = {};

icarusdb.all = () => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM chirps`, (err, results) => {
      if (err) {
        return reject(err);
      }

      return resolve(results);
    });
  });
};

icarusdb.one = (id) => {
  return new Promise((resolve, reject) => {
    // don't use `${}` in queries. use ? to avoid SQL injection
    pool.query(`SELECT * FROM chirps WHERE id = ?`, id, (err, results) => {
      if (err) {
        return reject(err);
      }

      return resolve(results[0]);
    });
  });
};

icarusdb.put = (id, userid, text) => {
  return new Promise((resolve, reject) => {
    // don't use `${}` in queries. use ? to avoid SQL injection
    pool.query(
      `INSERT INTO chirps (id, userid, text) VALUES (?, ?, ?)`,
      [id, userid, text],
      (err, results) => {
        if (err) {
          return reject(err);
        }

        return resolve(results[0]);
      }
    );
  });
};

module.exports = icarusdb;
