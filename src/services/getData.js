var express = require('express');
var router = express.Router();
var node = require('../modules/nodes/index');

exports.getCurrentNodes = async function getData(){
  return await node.getAll()
}