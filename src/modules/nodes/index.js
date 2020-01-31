const axios = require('axios');
require('dotenv')
var geoip = require('geoip-lite')
// class Node{
//     constructor(   
//         address,
//         declaredAddress,
//         peerName,
//         peerNonce,
//         applicationName,
//         applicationVersion,
//     ){  
//         this.address = address;
//         this.declaredAddress = declaredAddress;
//         this.peerName = peerName;
//         this.peerNonce = peerNonce;
//         this.applicationName = applicationName;
//         this.applicationVersion = applicationVersion;
//     }
// }
exports.getAll =  async function() {
    const result = await axios.get(`${process.env.ACRYL_API}`);
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
};
