var express = require('express');
var router = express.Router();
var nodes = require('../modules/nodes/index');

// exports.getCurrentNodes = async function getData(){
//   return await nodes.getAllNodes()
// }

module.exports = {
  async getCurrentNodes(){
    return await nodes.getAllNodes()
  }
}