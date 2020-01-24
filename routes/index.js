var express = require('express');
var router = express.Router();

var axios = require('axios');
var geoip = require('geoip-lite');
var Redis = require('ioredis');

/* GET home page. */
router.get('/', async function(req, res, next) {
  let redis = new Redis();
  let result = await axios.get('https://nodestestnet.acrylplatform.com/peers/connected');
  let ips = [];
  let ll = [];
  let test1 = await redis.get('keys ip*');
  result.data.peers.map(async function(elem){
    let nonce = elem.peerNonce;
    let ip = elem.address.slice(1, elem.address.indexOf(':'));
    let coord = geoip.lookup(ip);
    coord = coord.ll[0] + ' ' + coord.ll[1];
    redis.get('ip:'+ ip+ '_' + nonce, async function(err, reply) {
      if (err) throw err;
      if(reply === null){
        redis.set('ip:'+ ip+ '_' + nonce, 'll:'+ coord);
      }else{
      }
    });
    ips.push('ip:'+ ip+ '_' + nonce + ' ll:'+ coord);
    ll.push(coord);
  });
  console.log(test1);
  res.render('index', { ips: ips, coord: ll, count: ips.length, test: test1});
});

module.exports = router;
