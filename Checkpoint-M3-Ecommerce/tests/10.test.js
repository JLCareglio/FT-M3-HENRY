const supertest = require('supertest-as-promised')(require('../app'))
const expect = require('chai').expect
const model = require('../models/model')

describe('Routes', function () {
  beforeEach(function () {
    model.reset()
  })

  describe('/rating/:product', function () {
    it('GET responde con el rating del producto', function () {
      model.addCategory('Celulares')
      model.addProduct('iPhone 13 Pro', 'Apple', 'Celulares', 8)
      model.addReview('iPhone 13 Pro', 5, 'Me sirve', 'Nahuel')
      model.addReview('iPhone 13 Pro', 2, 'No me va', 'Mati')
      return supertest
        .get('/rating/iPhone 13 Pro')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          expect(res.body).to.eql({ rating: 3.5 })
        })
    })

    it('GET si no existe el producto responde con un error', function () {
      model.addCategory('Celulares')
      model.addProduct('iPhone 13 Pro', 'Apple', 'Celulares', 8)
      model.addReview('iPhone 13 Pro', 5, 'Me sirve', 'Nahuel')
      return supertest
        .get('/rating/Note 10')
        .expect(404)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          expect(res.body).to.eql({ error: 'Producto no encontrado' })
        })
    })
  })
})
