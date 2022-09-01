const axios = require("axios");
const db = require("../db.js");

const promisifiedGetCharacters = (req, res) => {
  let APIcharacters;
  axios.get("https://rickandmortyapi.com/api/character").then(
    (response) => {
      APIcharacters = response.data.results.map((char) => ({
        id: char.id,
        name: char.name,
        species: char.species,
      }));

      res.json({ characters: [...db, ...APIcharacters] });
    },
    (reason) => {
      res.status(500).json({ error: reason });
    }
  );
};

const asyncGetCharacters = async (req, res) => {
  try {
    const aux = await axios.get("https://rickandmortyapi.com/api/character");
    let format = aux.data.results.map((char) => ({
      id: char.id,
      name: char.name,
      species: char.species,
    }));

    res.json({ characters: [...db, ...format] });
  } catch (error) {
    res.status(400).json({ err: error });
    console.error(error);
  }
};

module.exports = {
  promisifiedGetCharacters,
  asyncGetCharacters,
};
