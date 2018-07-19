var express = require('express');
var users = require('../controllers/users.js');
var router = express.Router();
var path = require('path');

module.exports = function(app){

    app.get('/', users.index)

};