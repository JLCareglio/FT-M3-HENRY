/// ========================================================================== ///
/// ============================= HENRY-BOOKS ============================= ///
/// ================================== TESTS ================================= ///


const listBooks = require('../controllers/02-controller');
const utils = require('../utils');
const expect = require('chai').expect;

describe('---------- `listBooks` ----------', function () {

  const book = utils.generateBook();
  const book2 = utils.generateBook();

  beforeEach(function () {
    utils.reset();
  });

    it('devuelve un arreglo con los libros', function () {
      utils.books.push(book,book2);
      expect(listBooks()).to.eql([book, book2]);
    });
    it('si no hay libros relacionados devuelve un error que diga: "no hay libros en la base de datos', function () {
      expect(() => listBooks()).to.throw('no hay libros en la base de datos');
    });
});

