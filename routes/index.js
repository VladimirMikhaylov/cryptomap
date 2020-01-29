var express = require('express');
var router = express.Router();

var axios = require('axios');
var geoip = require('geoip-lite');
var Redis = require('ioredis');

router.use(function (req, res, next) {
  console.log('Time:', Date.now());
  const est = 'hi!';
  // res.send(est)
  // redis.get()
  next();
});

/* GET home page. */
router.get('/', async function(req, res, next) {
  // req.get(est);
  console.log(next.est)
  const redis = new Redis();
  const redisKeys = await redis.keys('name*');
  const redisValues = [];
  for( const item of redisKeys) {
    redisValues.push( item, await redis.get(item))
  }
  console.log(est);

  const curentNodes = await getData();
  console.log(curentNodes);

  
  res.render('index', {count:curentNodes.names.length, curentNodes:curentNodes});
});

async function getData(){
  const result = await axios.get('https://nodestestnet.acrylplatform.com/peers/connected');
  const res = {
    names:[],
    ips:[],
    coord:[]
  };

  for( const item of result.data.peers){
    const name = item.peerName;
    res.names.push(name);
    const ip = item.address.slice(1, item.address.indexOf(':'));
    const nonce = item.peerNonce; 
    res.ips.push('' + ip + '_' + nonce);
    let coord = geoip.lookup(ip);
    coord = coord.ll[0] + ' ' + coord.ll[1];
    res.coord.push(coord);
    const value = ['name:' + name, 'ip:' + ip+ '_' + nonce + ' ll:' + coord];
    // redis.set(value);
  }

  return res;
}

module.exports = router;
module.exports.CONST_DAY = 1