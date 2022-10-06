/// ========================================================================== ///
/// ============================= HENRY-BOOKS ============================= ///
/// ================================== TESTS ================================= ///

const utils = require("../utils");
const deleteBook = require("../controllers/04-controller");
const expect = require("chai").expect;
describe("----------`deleteBook`----------", function () {
  beforeEach(function () {
    utils.reset();
  });

  it("Debe retornar un mensaje con un error al no encontrar el libro", () => {
    const book1 = utils.generateBook();

    const book2 = utils.generateBook();

    utils.books.push(book1);

    utils.books.push(book2);

    let id = Math.ceil(Math.random() * 10);

    expect(() => deleteBook(id)).to.throw(`no existe el libro con id: ${id}`);
  });

  it("Debe eliminar el libro de forma correcta y responder con los libros teniendo en cuenta que no esta mas el que eliminamos", () => {
    const book1 = utils.generateBook();

    const book2 = utils.generateBook();

    const book3 = utils.generateBook();

    utils.books.push(book1);

    utils.books.push(book2);

    utils.books.push(book3);

    expect(deleteBook(book3.id)).not.to.contain(book3);

    expect(utils.books).to.have.length(2);

    expect(deleteBook(book2.id)).not.to.contain(book2);

    expect(utils.books).to.have.length(1);
  });
});
