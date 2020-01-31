const redis = require('../modules/redis/index')
const nodes = require('../modules/nodes/index')

module.exports = {
    async getCache(){
        const currentNodes = await nodes.getAllNodes();
        console.log('curent', currentNodes.names.length);
        let res = await redis.getAllKeys();
        if(res.length === 0){
            await this.setCache();
            res = await redis.getAllKeys();
        }
        const val = await redis.getAllValues(res);
        const result = {
            names:[],
            ips:[],
            coords:[]
        }
        for(let i=0;i<val.keys.length;i++){
            let name = val.keys[i];
            name = name.split(':').pop();
            let ip = val.values[i].split(' ');
            let coord = ip[1].split(':').pop() + ' ' + ip[2];
            ip = ip[0].split(':').pop();
            result.names.push(name);
            result.ips.push(ip);
            result.coords.push(coord);
        }
        return result
    },

    async setCache(){
        const currentNodes = await nodes.getAllNodes();
        console.log('curent', currentNodes.names.length);
        const res = {
            keys:[],
            values:[]
        }
        for(let i=0; i<currentNodes.names.length; i++){
            res.keys.push('name:'+currentNodes.names[i])
            res.values.push(`ips:${currentNodes.ips[i]} coords:${currentNodes.coords[i]}`)
        }
        await redis.setAllValues(res);
    }
};