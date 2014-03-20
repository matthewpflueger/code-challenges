'use strict';

var browserify = require('browserify-middleware');
var express = require('express');
var logger = require('morgan');
var app = express();

app.use(logger());

app.get('/index.js', browserify('../../client/profileservice/index.js'));
app.use(express.static('./client/profileservice/'));

app.get('/profileservice', function(req, res) {
  res.send('hello world');
});

app.listen(8000);
