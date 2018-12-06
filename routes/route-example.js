const express = require('express');
const modelExample = require('../dao/model-example');

const router = express.Router();

const DEFAULT_RESULT = {
  code: 500,
  msg: 'Undefined JSON object',
  data: 'undefined'
};

function writeJson(req, res) {
  const results = req.results !== undefined ? req.results : DEFAULT_RESULT;
  res.json(results);
}
router.get('/',
  modelExample.queryAll,
  writeJson,
);

router.get('/queryByTimeRange',
  modelExample.queryByTimeRange,
  writeJson,
);

module.exports = router;
