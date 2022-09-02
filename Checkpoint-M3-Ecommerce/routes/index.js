"use strict";

var express = require("express");

var router = express.Router();
module.exports = router;

const models = require("../models/model");

// escriban sus rutas acá
// siéntanse libres de dividir entre archivos si lo necesitan
// Nota: en este caso son pocas rutas por lo que se optara por no dividir entre archivos
router.get("/categories", (req, res) => {
  res.status(200).json(models.listCategories());
});

router.post("/categories", (req, res) => {
  const categoria = req.body.category;
  try {
    const resp = models.addCategory(categoria);
    res.status(201).json({ msg: resp });
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.get("/products", (req, res) => {
  res.json(models.listProducts()); // si no se especifica status, este es por defecto 200
});

router.post("/products", (req, res) => {
  const { name, brand, category, stock } = req.body;
  try {
    const producto = models.addProduct(name, brand, category, stock);
    res.status(201).json(producto);
  } catch (error) {
    res.status(404).json({ error });
  }
});

router.get("/products/:categoryName", (req, res) => {
  const categoryName = req.params.categoryName;
  const fullName = req.query.fullName;
  try {
    if (fullName) {
      const productos = models.listProducts(categoryName, fullName);
      res.json(productos); // si no se especifica status, este es por defecto 200
    } else {
      const productos = models.listProducts(categoryName);
      res.json(productos); // si no se especifica status, este es por defecto 200
    }
  } catch (error) {
    res.status(404).json({ error });
  }
});

router.get("/reviews", (req, res) => {
  const { name } = req.query;
  try {
    res.json(models.getReviews(name)); // si no se especifica status, este es por defecto 200
  } catch (error) {
    res.status(404).json({ error });
  }
});

router.post("/reviews", (req, res) => {
  const { name, stars, text, user } = req.body;
  let resp;
  try {
    resp = models.addReview(name, stars, text, user);
    res.status(201).json({ msg: resp });
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.get("/rating", (req, res) => {
  const resp = models.getRating();
  res.status(200).json(resp);
});

router.get("/rating/:product", (req, res) => {
  const product = req.params.product;
  try {
    const resp = models.getRating(product);
    res.status(200).json({ rating: resp });
  } catch (error) {
    res.status(404).json({ error });
  }
});
