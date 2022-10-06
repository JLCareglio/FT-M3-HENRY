const supertest = require('supertest-as-promised')(require('../app'))
const utils = require('../utils')
const expect = require('chai').expect;

  describe('GET /book/:id', function () {

    const books = [
      utils.generateBook(),
      utils.generateBook(),
      utils.generateBook()
    ];

    beforeEach(function () {
      utils.reset()
    });

    it('Responde con el libro buscado, junto a la fecha de petición', function () {
      utils.testBooks().push(books[0]);
      utils.testBooks().push(books[1]);
      utils.testBooks().push(books[2]);
      return supertest
        .get(`/book/${books[0].id}?quantity=${books[0].stock - 1}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) { 
          expect(res.body).to.eql({
            book: books[0],
            returnDate: new Date().toLocaleDateString()
          });
        });
    });

    it('Responde con un 400 si se envía una cantidad incorrecta de libros a pedir', function () {
      utils.testBooks().push(books[1]);
      return supertest
      .get(`/book/${books[1].id}?quantity=${books[1].stock + 2 }`)
      .expect(400)
      .expect('Content-Type', /json/)
      .expect(function (res) {
        expect(res.body).to.eql({ message: 'La cantidad solicitada supera el stock' });
        });
    });
    
    it('Responde con un 400 si no se recibe una cantidad de libros a solicitar', () => {
      return supertest
      .get(`/book/${books[1].id}`)
      .expect(400)
      .expect('Content-Type', /json/)
      .expect(function (res) {
        expect(res.body).to.eql({ message: 'Cantidad requerida' });
        });
    });
    
    it('Responde con un 404 si el libro solicitado no existe', () => {
      return supertest
      .get(`/book/${books[1].id}?quantity=3`)
      .expect(404)
      .expect('Content-Type', /json/)
      .expect(function (res) {
        expect(res.body).to.eql({ message: 'Libro no encontrado' });
        });
    });
});