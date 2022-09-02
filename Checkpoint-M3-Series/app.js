'use strict'
const router = require('./routes')
const express = require('express')
const app = express()

// Acuérdense de agregar su router o cualquier middleware que necesiten acá.

app.use(express.json())
app.use(router)

module.exports = app
