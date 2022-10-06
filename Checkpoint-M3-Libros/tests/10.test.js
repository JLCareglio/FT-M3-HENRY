const supertest = require("supertest-as-promised")(require("../app"));
const utils = require("../utils");
const expect = require('chai').expect;

describe("DELETE /books", function () {
  beforeEach(function () {
    utils.reset();
  });

  it("DELETE responde con un mensaje que nos indica que el libro fue eliminado correctamente", function () {
    const book = utils.generateBook();

    const book1 = utils.generateBook();

    utils.books.push(book);

    utils.books.push(book1);

    return supertest
      .delete("/books")
      .send({ id: book.id })
      .expect(200)
      .expect("Content-Type", /json/)
      .expect(function (res) {
        expect(res.body).to.eql({
          message: `El libro con el id ${book.id} fue eliminado correctamente`,
        });
      });
  });

  it("DELETE responde con un status 400 y el mensaje de error en caso de que no encuentre el libro", function () {
    const book = utils.generateBook();

    const book1 = utils.generateBook();

    utils.books.push(book);

    utils.books.push(book1);

    const id = 23;

    return supertest
      .delete("/books")
      .send({ id: id })
      .expect(400)
      .expect("Content-Type", /json/)
      .expect(function (res) {
        expect(res.body).to.eql({
          error: `no existe el libro con id: ${id}`,
        });
      });
  });
});
