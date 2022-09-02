'use strict';

var express = require('express');
const { listFamilies } = require('../models/model.js');
var router = express.Router();
var model = require('../models/model.js')

router.get('/families', (req, res) => {
    res.json(model.listFamilies());
})
router.post('/families', (req, res) => {
    const { family } = req.body
    const newFamily = model.addFamily(family)
    res.json(newFamily);
})
router.get('/characters', (req, res) => {
    res.json(model.listCharacter());
})
router.post('/characters', (req, res) => {
    const { name, age, family } = req.body
    const familyFound = listFamilies().find(f => f === family)
    if(!familyFound){
        res.status(400).json({msg: 'La familia ingresada no existe'})
    }
    const newCharacter = model.addCharacter(name, age, family)
    res.json(newCharacter);
})

router.get('/characters/:name', (req, res) => {
    const { name } = req.params
    const { pluck } = req.query
    res.json(model.listCharacter(name, Boolean(pluck)));
})

router.get('/quotes', (req, res) => {
    const { name } = req.body
    res.json(model.showQuotes(name));
})

router.post('/quotes', (req, res) => {
    const { name, quote, season } = req.body
    const newQuote = {
        text: quote,
        season: season,
    }
    model.addQuote(name, newQuote);
    res.json({msg: "Frase agregada correctamente"});
})

module.exports = router;
// escriban sus rutas acá
// siéntanse libres de dividir entre archivos si lo necesitan
