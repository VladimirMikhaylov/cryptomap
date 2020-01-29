const Redis = require('ioredis');
const redis = new Redis();

redis.on('ready', ()=>{ console.log('Redis is ready')})

module.exports = redis;