const dbUtil = require('../util/db');

/**
 * Schema:
 * id {id}
 * name {string}
 * age {number}
 * time {datetime}
 */
const SQL = {
  queryAll: 'SELECT * FROM user',
  queryByTimeRange: (start, end) => `SELECT * FROM user WHERE time >= ${start} AND time < ${end}`,
}

async function queryAll(req, res, next) {
  try {
    const { results } = await dbUtil.query(SQL.queryAll, []);
    req.results = results;
    next();
  } catch (err) {
    req.error = req.error ? [err].concat(req.error) : [err];
    next();
  }
};

async function queryByTimeRange(req, res, next) {
  try {
    const { start, end } = req.query;
    const { results } = await dbUtil.query(SQL.queryByTimeRange(start, end), []);
    req.results = results;
    next();
  } catch (err) {
    req.error = req.error ? [err].concat(req.error) : [err];
    next();
  }
}

module.exports = {
  queryAll,
  queryByTimeRange,
};
