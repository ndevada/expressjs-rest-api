// ANCHOR express module
var express = require('express');
// ANCHOR response module
var response = require('../res/response');
var app = express();

app.get('/', (req, res) => {
    response.ok(200, 'Ok', res);
});

module.exports = app;