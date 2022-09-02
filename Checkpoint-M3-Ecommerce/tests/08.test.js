const supertest = require('supertest-as-promised')(require('../app'))
const expect = require('chai').expect
const model = require('../models/model')

describe('/reviews', function () {
    beforeEach(function () {
        model.reset()
      })
      
    it('GET responde con un error si el producto no existe', function () {
      model.addCategory('Celulares')
      model.addProduct('iPhone 13 Pro', 'Apple', 'Celulares', 8, false)
      return supertest
        .get('/reviews?name=iPhone 18')
        .expect(404)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          expect(res.body).to.eql({ error: 'Producto no encontrado' })
        })
    })

    it('GET responde con un arreglo vacío si el producto no tiene reseñas', function () {
      model.addCategory('Celulares')
      model.addProduct('iPhone 13 Pro', 'Apple', 'Celulares', 8)
      return supertest
        .get('/reviews?name=iPhone 13 Pro')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          expect(res.body).to.eql([])
        })
    })

    it('POST agrega una reseña a un producto existente', function () {
      model.addCategory('Celulares')
      model.addProduct('iPhone 13 Pro', 'Apple', 'Celulares', 8)
      return supertest
        .post('/reviews')
        .send({
          name: 'iPhone 13 Pro',
          stars: 5,
          text: 'Me sirve',
          user: 'Nahuel'
        })
        .expect('Content-Type', /json/)
        .expect(function (res) {
          expect(model.getReviews('iPhone 13 Pro')).to.have.length(1)
        })
    })

    it('POST responde con mensaje de confirmación y status correspondinete si la reseña fue agreada', function () {
      model.addCategory('Celulares')
      model.addProduct('iPhone 13 Pro', 'Apple', 'Celulares', 8)
      return supertest
        .post('/reviews')
        .send({
          name: 'iPhone 13 Pro',
          stars: 5,
          text: 'Me sirve',
          user: 'Nahuel'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          expect(res.body).to.deep.eql({ msg: 'Reseña agregada correctamente' })
          expect(model.getReviews('iPhone 13 Pro')).to.have.length(1)
        })
    })

    it('POST responde con un error si el producto no existe', function () {
      model.addCategory('Celulares')
      model.addProduct('iPhone 13 Pro', 'Apple', 'Celulares', 8)
      return supertest
        .post('/reviews')
        .send({
          name: 'S20',
          stars: 5,
          text: 'Me sirve',
          user: 'Nahuel'
        })
        .expect(400)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          expect(res.body).to.deep.eql({ error: 'Producto no encontrado' })
          expect(model.getReviews('iPhone 13 Pro')).to.have.length(0)
        })
    })

    it('POST responde con un error si el puntaje es inválido', function () {
      model.addCategory('Celulares')
      model.addProduct('S20', 'Samsung', 'Celulares', 8)
      return supertest
        .post('/reviews')
        .send({
          name: 'S20',
          stars: 9,
          text: 'Lo mejor que me pasó en la vida',
          user: 'Minister'
        })
        .expect(400)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          expect(res.body).to.deep.eql({ error: 'Puntaje inválido' })
          expect(model.getReviews('S20')).to.have.length(0)
        })
    })

    it('POST responde con un error si faltan parámetros', function () {
      model.addCategory('Celulares')
      model.addProduct('S20', 'Samsung', 'Celulares', 8)
      return supertest
        .post('/reviews')
        .send({
          name: 'S20',
          text: 'Lo mejor que me pasó en la vida',
          user: 'Minister'
        })
        .expect(400)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          expect(res.body).to.deep.eql({ error: 'Faltan parámetros' })
          expect(model.getReviews('S20')).to.have.length(0)
        })
    })
  })