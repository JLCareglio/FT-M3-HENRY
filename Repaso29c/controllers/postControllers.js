const { idGenerator, validatePost } = require("../utils");
const db = require("../db.js");
const generatorObj = idGenerator(20);

const createCharacter = (req, res) => {
  // recepción de información por body de request
  const { personaje } = req.body;
  personaje.id = generatorObj.next().value;

  // validaciones
  const error = validatePost(personaje);
  if (error) return res.status(400).json({ msg: "Missing data or length" });

  // creación de nuevo personaje
  db.push(personaje);
  // db = [...db, personaje]

  // respuesta
  return res.json({ msg: "success", data: personaje });
};

module.exports = {
  createCharacter,
};
