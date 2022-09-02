'use strict';
var router = require('./routes')
var express = require('express');
var app = express();

// Acuérdense de agregar su router o cualquier middleware que necesiten acá.

app.use(express.json())
app.use(router)


module.exports = app; 
