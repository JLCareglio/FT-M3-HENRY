'use strict';

var express = require('express');
var app = express();
var characters = require('./routes/index.js')
var model = require('./models/model.js')
module.exports = app; // Esto es solo para testear mas facil

// Acuerdense de agregar su router o cualquier middleware que necesiten aca

app.use(express.json());
app.use('/', characters);

// El condicional es solo para evitar algun problema de tipo EADDRINUSE con mocha watch + supertest + npm test.
if (!module.parent) app.listen(3000);
