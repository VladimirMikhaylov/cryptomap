const Redis = require('ioredis');
const redis = new Redis();

redis.on('ready', ()=>{ console.log('Redis is ready')});
redis.on('error', (err) => {
    throw new Error('Redis error', err)
});
const pers = async function(){
    let asd = await redis.get('test');
    console.log(asd)
    return asd;
}

module.exports = pers;