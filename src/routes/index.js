var express = require('express');
var router = express.Router();
var nodes = require('../services/Nodes.service');
var cache = require('../services/Cache.service')

/* GET home page. */
router.get('/', async function(req, res, next) {
  const curentNodes = await cache.getCache();
  console.log('route', curentNodes.names.length);
  await res.render('index', {count:curentNodes.names.length, curentNodes:curentNodes});
});

module.exports = router;