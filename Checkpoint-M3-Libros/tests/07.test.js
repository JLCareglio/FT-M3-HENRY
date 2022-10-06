const supertest = require('supertest-as-promised')(require('../app'))
const utils = require('../utils')
const expect = require('chai').expect;

describe('POST /books', function () {

  
  const book = utils.generateBook();
  const book2 = utils.generateBook();
  beforeEach(function () {
    utils.reset()

  });
  it('POST si la categoría ya existe, responde con un error con su status correspondiente', function () {
    utils.books.push(book, book2)
    return supertest
      .post('/books')
      .send({book: [book, book2]})
      .expect(400)
      .expect('Content-Type', /json/)
      .expect(function (res) {
        expect(res.body).to.eql({err: "ya esta el libro en la base de datos."})
      });
  });

  
  it('POST responde con un status 201 y el mensaje correspondiente del controlador', function () {
    return supertest
      .post('/books')
      .send({book: [book, book2]})
      .expect(201)
      .expect('Content-Type', /json/)
      .expect(function (res) {
        expect(res.body).to.eql({msg: [book, book2]})
        expect(utils.books).to.have.length(2)
      });
  });
});

