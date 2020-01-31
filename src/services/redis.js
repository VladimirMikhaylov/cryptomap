const redis = require('../modules/redis/index')

async function redisGetCache(){
    console.log(redis)
    return console.log('asd');
}

module.exports = {redisGetCache};