const supertest = require('supertest-as-promised')(require('../app'))
const expect = require('chai').expect
const model = require('../models/model')

describe('/categories', function () {
    beforeEach(function () {
        model.reset()
      })
      
    it('GET inicialmente responde con un array vacío', function () {
      return supertest // supertest nos permite hacer y testear requests HTTP
        .get('/categories') // hacemos un request HTTP: GET a '/categories'
        .expect(200) // el codigo de status del response
        .expect('Content-Type', /json/) // podemos testear los headers
        .expect(function (res) {
          expect(res.body).to.eql([]) // testeamos la respuesta con el body
        })
    })

    it('GET responde con un array con los nombres de todas las categorías', function () {
      model.addCategory('Celulares')
      model.addCategory('Auriculares')
      return supertest
        .get('/categories')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          expect(res.body).to.eql(['Celulares', 'Auriculares'])
        })
    })

    it('POST agrega una nueva categoría, responde con un mensaje de confirmación y su status correspondiente', function () {
      return supertest
        .post('/categories')
        .send({ category: 'Celulares' })
        .expect(201)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          expect(res.body).to.eql({ msg: 'Categoría creada correctamente' })
          expect(model.listCategories()).to.have.length(1)
          expect(model.listCategories()[0]).to.eql('Celulares')
        })
    })

    it('POST si la categoría ya existe, responde con un error con su status correspondiente', function () {
      model.addCategory('Celulares')
      return supertest
        .post('/categories')
        .send({ category: 'Celulares' })
        .expect(400)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          expect(res.body).to.eql({ error: 'La categoría ya existe' })
          expect(model.listCategories()).to.have.length(1)
          expect(model.listCategories()[0]).to.eql('Celulares')
        })
    })
  })