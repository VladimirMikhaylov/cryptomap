var express = require('express');
var nodes = require('../modules/nodes/index');

module.exports = {
  async getCurrentNodes(){
    return await nodes.getAllNodes()
  }
}