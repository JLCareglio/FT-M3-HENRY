/// ========================================================================== ///
/// ============================= HENRY-books ============================= ///
/// ================================== TESTS ================================= ///


const addBook = require('../controllers/01-controller');
const utils = require('../utils');
const expect = require('chai').expect;

  describe('---------- `addBook` ----------', function () {

    const book = utils.generateBook();
    const book2 = utils.generateBook();

    beforeEach(function () {
      utils.reset();
    });

    it('busca el libro de la persona en tu base de datos, si esta, devuelve un error que diga: ya esta el libro en la base de datos.', function () {
      utils.books.push(book,book2)
      expect(() => addBook([book,book2])).to.throw("ya esta el libro en la base de datos.");
      expect(utils.books).to.have.length(2);
    });

    it('Agrega los libros al estante (utils.book)', function () {
      addBook([book,book2])
      expect(utils.books).to.eql([book, book2]);
      expect(utils.books).to.have.length(2);
    });
});