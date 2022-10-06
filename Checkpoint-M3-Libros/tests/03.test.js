/// ========================================================================== ///
/// ============================= HENRY-BOOKS ============================= ///
/// ================================== TESTS ================================= ///

const utils = require("../utils");
const findBook = require("../controllers/03-controller");
const expect = require('chai').expect;
describe("----------`findBook`----------", function () {
  beforeEach(function () {
    utils.reset();
  });

  it("Debe retornar un error al no encontrar el libro", () => {
    const book1 = utils.generateBook();
    const book2 = utils.generateBook();
    utils.books.push(book1);
    utils.books.push(book2);
    let id = Math.ceil(Math.random() * 10);
    expect(() => findBook(id)).to.throw("no se encontro el libro solicitado");
  });

  it("Debe modificar el libro de manera correcta", () => {
    const book1 = utils.generateBook();
    const book2 = utils.generateBook();
    utils.books.push(book1);
    utils.books.push(book2);
    const cambios = {
      id: book2.id,
      name: "Harry Potter",
      author: book2.author,
      stock: book2.stock,
      available: book2.available,
      rating: 2,
      admission: book2.admission,
      genre: "Magia pura",
    };
    const cambios2 = {
      id: book1.id,
      name: "El señor de los anillos",
      author: book1.author,
      stock: book1.stock,
      available: book1.available,
      rating: 5,
      admission: book1.admission,
      genre: "Alta fantasía",
    };
    expect(findBook(cambios)).to.eql(utils.books[1]);
    expect(findBook(cambios2)).to.eql(utils.books[0]);
  });

  it("Si alguno de los datos a modificar que recibe son undefined debe retornar un error", () => {
    const book2 = utils.generateBook();
    utils.books.push(book2);
    const cambios = {
      id: book2.id,
      name: "hola",
      author: book2.author,
      stock: book2.stock,
      available: book2.available,
      rating: 2,
      admission: book2.admission,
      genre: undefined,
    };
    expect(() => findBook(cambios)).to.throw("falta completar datos");
  });
});
