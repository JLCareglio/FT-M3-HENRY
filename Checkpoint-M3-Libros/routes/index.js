'use strict'

const express = require('express')
const controller = require('../controllers/controllers')
const router = express.Router()

// Escriban sus rutas acá
// Siéntanse libres de dividir entre archivos si lo necesitan


router.get('/rating/:product', (req, res) => {
  controller.getRating(req.params.product)
    .then((results) => {
      res.send({ rating: results })
    })
    .catch(err => {
      res.status(404).send({ error: err.message })
    })
})

// Hint:  investigá las propiedades del objeto Error en JS para acceder al mensaje en el mismo.
module.exports = router
