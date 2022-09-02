const supertest = require('supertest-as-promised')(require('../app'))
const expect = require('chai').expect
const model = require('../models/model')

describe('/products/:categoryName', function () {
    beforeEach(function () {
        model.reset()
      })
      
    it('GET responde con un error si la categoría no existe', function () {
      model.addCategory('Celulares')
      model.addProduct('iPhone 13 Pro', 'Apple', 'Celulares', 8)
      model.addProduct('S20', 'Samsung', 'Celulares', 11)
      return supertest
        .get('/products/Auriculares')
        .expect(404)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          expect(res.body).to.eql({ error: 'La categoría no existe' })
        })
    })

    it('GET responde con un array de todos los productos de esa categoría', function () {
      model.addCategory('Celulares')
      model.addProduct('iPhone 13 Pro', 'Apple', 'Celulares', 8)
      model.addProduct('S20', 'Samsung', 'Celulares', 11)
      return supertest
        .get('/products/Celulares')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          expect(res.body).to.deep.eql([
            {
              name: 'iPhone 13 Pro',
              categoryId: 1,
              brand: 'Apple',
              stock: 8,
              available: true,
              reviews: [],
              rating: 0
            },
            {
              name: 'S20',
              categoryId: 1,
              brand: 'Samsung',
              stock: 11,
              available: true,
              reviews: [],
              rating: 0
            }
          ])
        })
    })

    it('GET responde con un array de SÓLO la marca y nombre de todos los productos de esa categoría cuando fullName es true', function () {
      model.addCategory('Celulares')
      model.addProduct('iPhone 13 Pro', 'Apple', 'Celulares', 8, false)
      model.addProduct('S20', 'Samsung', 'Celulares', 11)
      return supertest
        .get('/products/Celulares?fullName=true')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          expect(res.body).to.deep.eql(['Apple iPhone 13 Pro', 'Samsung S20'])
        })
    })
  })