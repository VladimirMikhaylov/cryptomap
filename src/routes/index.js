var express = require('express');
var router = express.Router();
var nodes = require('../services/getData');

/* GET home page. */
router.get('/', async function(req, res, next) {
  const curentNodes = await nodes.getCurrentNodes();
  await res.render('index', {count:curentNodes.names.length, curentNodes:curentNodes});
});

module.exports = router;