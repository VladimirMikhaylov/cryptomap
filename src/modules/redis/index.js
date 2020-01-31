const Redis = require('ioredis');
const redis = new Redis();

redis.on('ready', ()=>{ console.log('Redis is ready')});
redis.on('error', (err) => {
    throw new Error('Redis error', err)
});

module.exports = {
    async getAllKeys(){
        let asd = await redis.keys('*');
        return asd;
    },

    async getAllValues(keys){
        const values = {
            keys:[],
            values: []
        };
        
        for( const item of keys){
            values.keys.push(item);
            values.values.push(await redis.get(item));
        }  
        return values;
    },

    async setAllValues(items){
        for(let i=0; i<items.keys.length; i++){
            await redis
                .pipeline()
                .set(items.keys[i], items.values[i])
                .expire(items.key, 900)
                .exec();
        }
    }
};