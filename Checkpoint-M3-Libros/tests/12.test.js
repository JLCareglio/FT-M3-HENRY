const supertest = require('supertest-as-promised')(require('../app'));
const utils = require('../utils');
const expect = require('chai').expect;

describe('POST /reviews', function () {
  beforeEach(() => {
    utils.reset();
  });
  
  it("Deberia responder con los libros clasificados junto a la fecha de la peticion", () => {
    const book1  = utils.generateBook();
      const book4 = utils.generateBook();
      const book5 = utils.generateBook();
      const book11 = utils.generateBook();
      utils.books.push(book1);
      utils.books.push(book4);
      utils.books.push(book5);
      utils.books.push(book11);
      book5.genre = 'History';
      book1.genre = 'Fantasy';
      book11.genre = 'Horror';
      book4.genre = book1.genre;
    return supertest.get('/books/classified')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(function (res) {
        expect(res.body).to.eql({ 
          books: {
            [book1.genre]: [
                utils.testBooks()[0],
                utils.testBooks()[1]
              ],
            [book5.genre]: [
                utils.testBooks()[2]
              ],
            [book11.genre]: [
                utils.testBooks()[3]
              ]
            },
          requestDate: new Date().toLocaleDateString()
        });
      });
    });
  it('Deberia responder con un mensaje de error y un status code 500 si no hay libros disponibles', () => {
    return supertest
      .get('/books/classified')
      .expect(500)
      .expect('Content-Type', /json/)
      .expect(function (res) {
        expect(res.body).to.eql({ message: 'No hay libros disponibles' });
      });
  });
});
