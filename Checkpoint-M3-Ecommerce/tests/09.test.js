const supertest = require('supertest-as-promised')(require('../app'))
const expect = require('chai').expect
const model = require('../models/model')

describe('/rating', function () {
    beforeEach(function () {
        model.reset()
      })
      
    it('GET Devuelve el nombre de los 5 mejores puntuados', function () {
      model.addCategory('Celulares')
      model.addCategory('Auriculares')
      model.addProduct('Wh-1000xm4', 'Sony', 'Auriculares', 15)
      model.addReview('Wh-1000xm4', 5, 'Una locura', 'Hernán')
      model.addProduct('iPhone 13 Pro', 'Apple', 'Celulares', 8)
      model.addReview('iPhone 13 Pro', 4.5, 'Buenaso', 'Toni')
      model.addProduct('Note 10', 'Xiaomi', 'Celulares', 14)
      model.addReview('Note 10', 4, 'Juega', 'Monas')
      model.addProduct('A71', 'Samsung', 'Celulares', 6)
      model.addReview('A71', 3.5, 'Me sirve', 'Nahuel')
      model.addProduct('1100', 'Nokia', 'Celulares', 1)
      model.addReview('1100', 3, 'Sigue vigente', 'Fede')
      model.addProduct('S20', 'Samsung', 'Celulares', 11)
      model.addReview('S20', 2, 'No me convence', 'Mati')
      model.addProduct('Airpods', 'Apple', 'Auriculares', 3)
      model.addReview('Airpods', 1, 'Re salados', 'Minister')
      return supertest
        .get('/rating')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          expect(res.body).to.eql(['Wh-1000xm4', 'iPhone 13 Pro', 'Note 10', 'A71', '1100'])
        })
    })
  })