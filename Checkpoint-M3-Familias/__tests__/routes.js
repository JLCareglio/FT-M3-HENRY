/* eslint-disable no-unused-expressions */

var supertest = require('supertest-as-promised')(require('../app'));
var model = require('../models/model');


describe('Routes', function() {

  beforeEach(function() {
    model.reset();
  });

  describe('/families', function() {
    it('GET responde con un array vacío de entrada', function() {
      return supertest // supertest nos permite hacer y testear requests HTTP
        .get('/families') // hacemos un request HTTP: GET a '/families'
        .expect(200) // el codigo de status del response
        .expect('Content-Type', /json/) // podemos testear los headers
        .expect(function(res) {
          expect(res.body).toEqual([]); // testeamos la respuesta con el body
        });
    });

    it('GET responde con un array con los nombres de todas las familias agregadas', function() {
      model.addFamily('Simpsons');
      model.addFamily('Gorgory');
      return supertest
        .get('/families')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function(res) {
          expect(res.body).toEqual(["Simpsons", "Gorgory"]);
        });
    });

    it('POST agregar una nueva familia y devuelve el nombre de la familia agregada', function() {
      return supertest
        .post('/families')
        .send({family: 'Simpsons'})
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function(res) {
          expect(res.body).toEqual("Simpsons");
          expect(model.listFamilies()).toHaveLength(1);
          expect(model.listFamilies()[0]).toEqual("Simpsons");
        });
    });
  });

  describe('/characters', function() {
    it('GET responde con un array vacío de entrada', function() {
      return supertest
        .get('/characters')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function(res) {
          expect(res.body).toEqual([]);
        });
    });

    it('GET responde con un array de todos los personajes', function() {
      model.addFamily('Simpsons');
      model.addFamily('Gorgory');
      model.addCharacter('Homero', 36, "Simpsons");
      model.addCharacter('Bart', 10, "Simpsons");
      model.addCharacter('Rafa', 8, "Gorgory");
      return supertest
        .get('/characters')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function(res) {
          expect(res.body).toEqual([{name: 'Homero', age: 36, quotes: [], familyId: 1},
           {name: 'Bart', age: 10, quotes: [], familyId: 1},
           {name: 'Rafa', age: 8, quotes: [], familyId: 2}]
          );
        });
    });

    it('POST agrega un nuevo personaje y lo devuelve', function() {
      model.addFamily('Simpsons');
      return supertest
        .post('/characters')
        .send({name: 'Homero', age: 36, family: 'Simpsons'})
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function(res) {
          expect(res.body).toEqual({name: 'Homero', age: 36, quotes: [], familyId: 1});
          expect(model.listCharacter()).toHaveLength(1);
          expect(model.listCharacter()[0].name).toEqual("Homero");
        });
    });

    it('POST devuelve un mensaje de error si el la familia no existe', function() {
      return supertest
        .post('/characters')
        .send({name: 'Homero', age: 36, family: 'Simpsons'})
        .expect(400)
        .expect('Content-Type', /json/)
        .expect(function(res) {
          expect(res.body).toEqual({msg: 'La familia ingresada no existe'});
          expect(model.listCharacter()).toHaveLength(0);
        });
    });
  });

  describe('/characters/:name', function() {
    it('GET responde con un array vacío si la familia no existe', function() {
      model.addFamily('Simpsons');
      model.addFamily('Gorgory');
      model.addCharacter('Homero', 36, "Simpsons");
      model.addCharacter('Bart', 10, "Simpsons");
      model.addCharacter('Rafa', 8, "Gorgory");
      return supertest
        .get('/characters/Bender')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function(res) {
          expect(res.body).toEqual([]);
        });
    });

    it('GET responde con un array de todos los personajes de esa familia', function() {
      model.addFamily('Simpsons');
      model.addFamily('Gorgory');
      model.addCharacter('Homero', 36, "Simpsons");
      model.addCharacter('Bart', 10, "Simpsons");
      model.addCharacter('Rafa', 8, "Gorgory");
      return supertest
        .get('/characters/Simpsons')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function(res) {
          expect(res.body).toEqual([{name: 'Homero', age: 36, quotes: [], familyId: 1},
           {name: 'Bart', age: 10, quotes: [], familyId: 1}]
          );
        });
    });

    it('GET responde con un array de SÓLO los nombres todos los personajes de esa familia cuando pluck es true', function() {
      model.addFamily('Simpsons');
      model.addFamily('Gorgory');
      model.addCharacter('Homero', 36, "Simpsons");
      model.addCharacter('Bart', 10, "Simpsons");
      model.addCharacter('Rafa', 8, "Gorgory");
      return supertest
        .get('/characters/Simpsons?pluck=true')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function(res) {
          expect(res.body).toEqual(["Homero", "Bart"]);
        });
    });
  });

  describe('/quotes', function() {
    it('GET responde con un array vacío si el personaje no existe', function() {
      return supertest
        .get('/quotes')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function(res) {
          expect(res.body).toEqual([]);
        });
    });

    it('GET responde con todas las frases del personaje indicado pasado por body', function() {
      model.addFamily('Simpsons');
      model.addCharacter('Homero', 36, "Simpsons");
      model.addQuote("Homero", {text: "Marge, no voy a mentirte"});
      model.addQuote("Homero", {text: "No existe la tecla cualquiera"});
      return supertest
        .get('/quotes')
        .send({name: 'Homero'})
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function(res) {
          expect(res.body).toEqual([{season: false, text: "Marge, no voy a mentirte"}, {season: false, text: "No existe la tecla cualquiera"}]); // testeamos la respuesta con el body
        });
    });

    it('POST agrega una nueva frase al personaje indicado y devuelve el mensaje indicado', function() {
      model.addFamily('Simpsons');
      model.addCharacter('Homero', 36, "Simpsons");
      model.addQuote("Homero", {text: "Marge, no voy a mentirte"});
      return supertest
        .post('/quotes')
        .send({name: 'Homero', quote: "Na na na na na na na na na na Henry"})
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function(res) {
          expect(res.body).toEqual({msg: "Frase agregada correctamente"});
          expect(model.showQuotes("Homero")).toEqual([{season: false, text: "Marge, no voy a mentirte"}, {season: false, text: "Na na na na na na na na na na Henry"}])
        });
    });

  });

 });
