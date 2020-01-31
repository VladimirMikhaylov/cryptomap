const axios = require('axios');
var config = require('../../../config/index');
var geoip = require('geoip-lite')

module.exports = {
    async getAllNodes(){
        const result = await axios.get(`${config.get('API')}`);
        const res = {
          names:[],
          ips:[],
          coords:[]
        };
      
        for( const item of result.data.peers){
          const name = item.peerName;
          res.names.push(name);
          const ip = item.address.slice(1, item.address.indexOf(':'));
          const nonce = item.peerNonce; 
          res.ips.push('' + ip + '_' + nonce);
          let coord = geoip.lookup(ip);
          coord = coord.ll[0] + ' ' + coord.ll[1];
          res.coords.push(coord);
        }  
        return res;
    }
}
