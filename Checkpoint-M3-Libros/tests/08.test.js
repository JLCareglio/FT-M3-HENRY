/// ========================================================================== ///
/// ============================= HENRY-books ============================= ///
/// ================================== TESTS ================================= ///


const utils = require('../utils')
const supertest = require('supertest-as-promised')(require('../app'))
const expect = require('chai').expect;

describe('---------- `getRating` ----------', function () {
 
  const book = utils.generateBook();
  const book2 = utils.generateBook();

  beforeEach(function () {
    utils.reset()
  })
  it('Si el producto no existe, arroja un error', function () {
    return supertest
      .get('/books')
      .expect(400)
      .expect(function (res) {
        expect(res.body).to.eql({ err: "no hay libros en la base de datos"})
      })
  }) 

  it('Devuelve los libros', function () {
    utils.books.push(book,book2)
    return supertest
      .get('/books')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(function (res) {
        expect(res.body).to.eql([book,book2])
      })
  })
})