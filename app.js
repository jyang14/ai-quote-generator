'use strict';
var express = require('express');
var http = require('http');

// Setting the port number
var port = process.env.PORT || 8000;

// Initializing express
var app = express();

app.set('view engine', 'pug');

app.use(express.static('./public'));

app.get('/', function (req, res) {
    res.render('index');
});

var server = http.createServer(app).listen(port);
