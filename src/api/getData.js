var express = require('express');
var router = express.Router();
var axios = require('axios');
var geoip = require('geoip-lite');

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