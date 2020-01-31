var express = require('express');
var router = express.Router();
var cache = require('../services/Cache.service');

/* GET home page. */
router.get('/', async function(req, res, next) {
  const curentNodes = await cache.getCache();
  await res.render('index', {count:curentNodes.names.length, curentNodes:curentNodes});
});

module.exports = router;