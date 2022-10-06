'use strict'
const express = require('express');
const app = express();
const addBook = require('./routes/08-route');
const listBooks = require('./routes/07-route');
const findBook = require('./routes/09-route');
const deleteBook = require('./routes/10-route');
const takeBook = require('./routes/11-route');
const classifyBooks = require('./routes/12-route');


// Acuérdense de agregar su router o cualquier middleware que necesiten acá.

app.use(express.json());
app.use(addBook);
app.use(listBooks);
app.use(findBook);
app.use(deleteBook);
app.use(takeBook);
app.use(classifyBooks);

module.exports = app
