const supertest = require('supertest-as-promised')(require('../app'))
const expect = require('chai').expect
const model = require('../models/model')

describe('/products', function () {
    beforeEach(function () {
        model.reset()
      })
      
    it('GET inicialmente responde con un array vacío', function () {
      return supertest
        .get('/products')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          expect(res.body).to.eql([])
        })
    })

    it('GET responde con un array de todos los productos', function () {
      model.addCategory('Celulares')
      model.addCategory('Auriculares')
      model.addProduct('iPhone 13 Pro', 'Apple', 'Celulares', 8)
      model.addProduct('S20', 'Samsung', 'Celulares', 11)
      model.addProduct('1100', 'Nokia', 'Celulares', 0)
      model.addProduct('Wh-1000xm4', 'Sony', 'Auriculares', 15)
      return supertest
        .get('/products')
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
            },
            {
              name: '1100',
              categoryId: 1,
              brand: 'Nokia',
              stock: 0,
              available: false,
              reviews: [],
              rating: 0
            },
            {
              name: 'Wh-1000xm4',
              categoryId: 2,
              brand: 'Sony',
              stock: 15,
              available: true,
              reviews: [],
              rating: 0
            }
          ])
        })
    })

    it('POST agrega un nuevo producto y lo devuelve', function () {
      model.addCategory('Celulares')
      return supertest
        .post('/products')
        .send({
          name: 'iPhone 13 Pro',
          brand: 'Apple',
          category: 'Celulares',
          stock: 8
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          expect(res.body).to.eql({
            name: 'iPhone 13 Pro',
            categoryId: 1,
            brand: 'Apple',
            stock: 8,
            available: true,
            reviews: [],
            rating: 0
          })
          expect(model.listProducts()).to.have.length(1)
          expect(model.listProducts()[0].name).to.eql('iPhone 13 Pro')
        })
    })

    it('POST Si la categoría no existe no agrega el producto y responde con un error', function () {
      return supertest
        .post('/products')
        .send({
          name: 'iPhone 13 Pro',
          brand: 'Apple',
          category: 'Celulares',
          stock: 8
        })
        .expect(404)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          expect(res.body).to.deep.eql({ error: 'La categoría ingresada no existe' })
          expect(model.listProducts()).to.have.length(0)
        })
    })
  })
