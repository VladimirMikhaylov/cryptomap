var express = require('express');
var router = express.Router();
var nodes = require('../services/Nodes.service');
var cache = require('../services/redis')

/* GET home page. */
router.get('/', async function(req, res, next) {
  const curentNodes = await nodes.getCurrentNodes();
  // const ad = await cache.redisGetCache();
  await res.render('index', {count:curentNodes.names.length, curentNodes:curentNodes});
});

module.exports = router;