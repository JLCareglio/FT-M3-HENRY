const express = require("express");
const app = express();
const { sumArray } = require("./utils");

app.use(express.json()); // for parsing application/json

app.get("/", (req, res) => {
  res.send({
    message: "hola",
  });
});

app.get("/test", (req, res) => {
  res.send({ message: "hola" });
});

app.post("/sum", (req, res) => {
  const { a, b } = req.body; // destructuro ("tomo/saco/quito") desde el body
  res.send({ result: a + b });
});

app.post("/sumArray", (req, res) => {
  const { array, num } = req.body;
  let result = sumArray(array, num);
  if (result) {
    return res.status(200).json({ result: result });
  } else {
    return res.status(400).json({ err: "No hay suma" });
  }
});

app.post("/product", (req, res) => {
  res.send({
    result: req.body.a * req.body.b,
  });
});

app.post("/numString", (req, res) => {
  const { string } = req.body;
  if (typeof string !== "string" || string === "") return res.sendStatus(400);
  return res.json({ result: string.length });
});

app.post("/pluck", (req, res) => {
  const { array, name } = req.body;
  if (!Array.isArray(array) || typeof name !== "string" || name === "")
    return res.sendStatus(400);

  const result = array.reduce((result, item) => {
    if (item.hasOwnProperty(name)) {
      result = [...result, item[name]];
    }
    return result;
  }, []);

  return res.json({ result });

  //     [
  //           { nombre: "producto1", price: 100 },
  //           { nombre: "producto2", price: 200 },
  //           { nombre: "producto3", price: 300 },
  //    ]

  // las props de price ---> [  ]
});

module.exports = app; // Exportamos app para que supertest session la pueda ejecutar
