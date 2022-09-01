const db = require("../db.js");

const updateCharacter = (req, res) => {
  // recepción de characterId por params
  const { characterId } = req.params; // esto es un string, cuidado hay que usarlo como numero despues

  // recepción de información por body de request
  // const {name, species} = req.body
  const { personaje } = req.body;
  // validaciones
  if (!characterId || !Object.keys(personaje).length)
    return res.status(400).json({ msg: "missing data" });
  // busqueda
  let busquedaPersonaje = db.find(
    (pj) => Number(pj.id) === Number(characterId)
  );
  if (!busquedaPersonaje)
    return res.status(404).json({ err: "Character not found" });
  // edición de personaje
  busquedaPersonaje.species = personaje.species;
  // busquedaPersonaje = {...personaje} // si no genero un obj nuevo, rompe por la ref de memoria
  // respuesta
  res.json({ msg: "success", data: busquedaPersonaje });
};

const deleteCharacter = (req, res) => {
  // recepción de characterId por params
  const { characterId } = req.params;
  // validaciones
  const characterToDelete = db.find((char) => char.id === Number(characterId));

  if (!characterToDelete)
    return res.status(404).json({ error: "Character not found" });
  // eliminación de personaje
  db.splice(db.indexOf(characterToDelete), 1);
  // respuesta
  res.json({ msg: "success", data: characterId });
};

module.exports = {
  updateCharacter,
  deleteCharacter,
};
