/// ========================================================================== ///
/// ============================= HENRY-COMMERCE ============================= ///
/// ================================== TESTS ================================= ///

const utils = require("../utils");
const takeBook = require("../controllers/05-controller");
const expect = require("chai").expect;

describe("---------- `takeBook` ----------", function () {
  beforeEach(function () {
    utils.reset();
  });

  const books = [utils.generateBook(), utils.generateBook()];

  it("Encuentra un libro y lo devuelve", function () {
    utils.testBooks().push(books[0]);
    utils.testBooks()[0].stock = 10;
    expect(takeBook(books[0].id, 1)).to.eql({
      book: books[0],
      returnDate: new Date().toLocaleDateString(),
    });
    utils.testBooks().push(books[1]);
    utils.testBooks()[1].stock = 10;
    expect(takeBook(books[0].id, 1)).to.eql({
      book: books[0],
      returnDate: new Date().toLocaleDateString(),
    });
    expect(takeBook(books[1].id, 1)).to.eql({
      book: books[1],
      returnDate: new Date().toLocaleDateString(),
    });
  });

  it("Si el libro no es encontrado, arroja un error", function () {
    expect(() => takeBook(null, 1)).to.throw("Libro no encontrado");
    expect(() => takeBook(3, 1)).to.throw("Libro no encontrado");
    utils.testBooks().push(books[1]);
    expect(() => takeBook("Libro", 1)).to.throw("Libro no encontrado");
  });

  it("Si la cantidad de libros supera al stock disponible, arroja un error", function () {
    utils.testBooks().push(books[0]);
    utils.testBooks()[0].stock = 0;
    expect(() => takeBook(books[0].id, Math.random() + 3)).to.throw(
      "La cantidad de libros solicitados supera el stock"
    );
  });

  it("Deberia arrojar un error si no se ingresa una cantidad de libros a retirar", () => {
    expect(() => takeBook(Math.random())).to.throw("Cantidad requerida");
  });
});
