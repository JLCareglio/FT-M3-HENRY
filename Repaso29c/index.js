// Imports de herramientas
const express = require("express");
const morgan = require("morgan");
const { promisifiedGetCharacters } = require("./controllers/getControllers");
const { createCharacter } = require("./controllers/postControllers");
const {
  updateCharacter,
  deleteCharacter,
} = require("./controllers/putControllers");

// npm i uuid -- "123-fasd34-2ds2-ff52-vr43"
// const uuid = require("uuid")
// uuid()

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan("dev"));
// app.use(req,res,next => next() ) --> utilizar next para avanzar

// Una ruta GET de prueba
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Read
app.get("/characters", promisifiedGetCharacters);
// Create
app.post("/characters", createCharacter);
// Update
app.put("/characters/edit/:characterId", updateCharacter);
// Delete
app.delete("/characters/:characterId", deleteCharacter);

app.listen(3000);
