'use strict';

var characters = [];

var families = [];


module.exports = {
  reset: function () {
    // No es necesario modificar esta función (Ya está completa)
    characters = [];
    families = [];
  },
  // ==== COMPLETEN LAS SIGUIENTES FUNCIONES (vean los test de `model.js`) =====
  listCharacter: function (family, pluckName) {
    // Devuelve un arreglo con todos los personajes
    // Si recibe un nombre de familia como parámetro debería filtrar solo los personajes de ella
    // Si recibe un segundo parámetro en true debe devolver únicamente los nombres de los personajes
    if ( family && !pluckName) {
      let filteredCharacters = characters.filter(c => c.familyId === families.indexOf(family) + 1);
      return filteredCharacters;
    }
    if (family && pluckName === true){
      let filteredCharacters = characters.filter(c => c.familyId === families.indexOf(family) + 1);
      let filteredCharNames = filteredCharacters.map(c => c.name);
      return filteredCharNames;
    }
    return characters;
  },
  addFamily: function (name) {
    // Agrega el apellido de una nueva familia verificando que no exista
    // Debe retornar el nombre de la familia agregado o existente
    const findFamily = families.filter(f => f === name);
    if(findFamily.length === 0){
    families.push(name);}
    return name
  },

  listFamilies: function() {
    // Devuelve un arreglo con todas las familias
    return families;
  },
  addCharacter: function(name, age, family) {
    // Agrega un nuevo personaje, inicialmente sus frases (quotes) deben estar "vacias"
    // Adicionalmente va a ser necesario guardar el número de familia y no su nombre
    // El número de familia debe empezar desde 1 y no desde 0.
    // Debe retornar el personaje creado
    var familyId = 1 + families.indexOf(family)

    const newCharacter = {
      name: name,
      age: age,
      familyId: familyId,
      quotes: []
    };
    const filteredFamilies = families.filter(f => f === family);
    if (filteredFamilies.length !== 0){
    characters.push(newCharacter);
    }
    return newCharacter;
  },
  addQuote: function(name, quote) {
    // Agrega una nueva frase a un personaje en particular con el formato:
    // {text: "Este es el texto de la frase", season: 3}
    const character = characters.find(c => c.name === name)
    if(!quote.season){
      quote.season = false;
    }
    if (character && typeof quote.text === 'string' && quote.text.length > 0){
      character.quotes.push(quote);
    }
  },
  showQuotes: function(name) {
    // Devuelve todas las frases de un personaje en particular
    const character = characters.find(c => c.name === name)
    if(character) {
    return character.quotes;
    }else{
    return [];
    }
  },
};
