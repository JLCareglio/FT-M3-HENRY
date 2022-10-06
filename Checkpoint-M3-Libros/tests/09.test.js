const supertest = require("supertest-as-promised")(require("../app"));
const utils = require("../utils");
const expect = require("chai").expect;

describe("PUT /books", function () {
  beforeEach(function () {
    utils.reset();
  });

  it("PUT responde con un mensaje que nos indica que el libro fue actualizado correctamente", function () {
    const book2 = utils.generateBook();

    utils.books.push(book2);

    const book = {
      id: book2.id,
      name: "hola",
      author: book2.author,
      stock: book2.stock,
      available: book2.available,
      rating: 2,
      admission: book2.admission,
      genre: "superFantasioso",
    };

    return supertest
      .put("/books")
      .send({ book })
      .expect(200)
      .expect("Content-Type", /json/)
      .expect(function (res) {
        expect(res.body).to.eql({
          message: "Libro actualizado correctamente",
        });
      });
  });

  it("PUT responde con un status 400 y el mensaje de error en caso de que no encuentre el libro", function () {
    const book2 = utils.generateBook();
    utils.books.push(book2);
    const book = {
      id: 56,
      name: "hola",
      author: book2.author,
      stock: book2.stock,
      available: book2.available,
      rating: 2,
      admission: book2.admission,
      genre: "superFantasioso",
    };
    return supertest
      .put("/books")
      .send({ book })
      .expect(400)
      .expect("Content-Type", /json/)
      .expect(function (res) {
        expect(res.body).to.eql({
          error: "no se encontro el libro solicitado",
        });
      });
  });

  it("PUT responde con un status 400 y el mensaje de error en caso de que reciba algun valor undefined", function () {
    const book2 = utils.generateBook();
    utils.books.push(book2);
    const book = {
      id: book2.id,
      name: "hola",
      author: book2.author,
      stock: book2.stock,
      available: book2.available,
      rating: 2,
      admission: book2.admission,
      genre: undefined,
    };
    return supertest
      .put("/books")
      .send({ book })
      .expect(400)
      .expect("Content-Type", /json/)
      .expect(function (res) {
        expect(res.body).to.eql({
          error: "falta completar datos",
        });
      });
  });
});
