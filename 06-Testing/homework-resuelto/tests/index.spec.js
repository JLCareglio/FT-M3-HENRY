const session = require("supertest-session");
const app = require("../index.js"); // Importo el archivo de entrada del server de express.

const agent = session(app);

const POST_NUMSTRING = "/numString";

describe("Test de APIS", () => {
  describe("GET /", () => {
    it("responds with 200", () => agent.get("/").expect(200));
    it("responds with and object with message `hola`", () =>
      agent.get("/").then((res) => {
        expect(res.body.message).toEqual("hola");
      }));
  });

  describe("GET /test", () => {
    it("responds with 200", () => agent.get("/test").expect(200));
    it("responds with and object with message `test`", () =>
      agent.get("/test").then((res) => {
        expect(res.body.message).toEqual("hola");
      }));
  });

  describe("POST /sum", () => {
    it("responds with 200", () => agent.post("/sum").expect(200));
    it("responds with the sum of 2 and 3", () =>
      agent
        .post("/sum")
        .send({ a: 2, b: 3 })
        .then((res) => {
          expect(res.body.result).toEqual(5);
        }));
  });

  describe("POST /producto", () => {
    it("responds with 200", () => agent.post("/product").expect(200));
    it("responds with the product of 2 and 3", () =>
      agent
        .post("/product")
        .send({ a: 2, b: 3 })
        .then((res) => {
          expect(res.body.result).toEqual(6);
        }));
  });

  describe("POST /sumArray", () => {
    it("responds with 400", () => agent.post("/sumArray").expect(400));
    it("responds with 200", () =>
      agent
        .post("/sumArray")
        .send({ array: [1, 2], num: 3 })
        .expect(200));
    it("responds with and object with message indicando si existe la suma`", () =>
      agent
        .post("/sumArray")
        .send({ array: [2, 5, 7, 10, 11, 15, 20], num: 13 })
        .then((res) => {
          expect(res.body.result).toEqual(true);
        }));
  });

  describe("POST /numString", () => {
    it("responds with 400 if string is a number", () =>
      agent.post("/numString").send({ string: 123 }).expect(400));

    it("responds with 400 if string is empty", () =>
      agent.post("/numString").expect(400));

    it("responds with 200", () =>
      agent.post("/numString").send({ string: "asdasd" }).expect(200));

    it("responds with 4", () =>
      agent
        .post(POST_NUMSTRING)
        .send({ string: "hola" })
        .then((res) => {
          expect(res.body.result).toEqual(4);
        }));
  });

  describe("POST /pluck", () => {
    it("responds with 400 if array is not an array", () =>
      agent.post("/pluck").expect(400));

    it("responds with 400 with wrongs params", () => {
      return agent
        .post("/pluck")
        .send({ array: "asdasd", name: 1233 })
        .expect(400);
    });
    it("responds with 200", () =>
      agent.post("/pluck").send({ array: [], name: "algo" }).expect(200));

    it("responds with prices", () => {
      agent
        .post("/pluck")
        .send({
          array: [
            { name: "producto1", price: 100 },
            { name: "producto2", price: 200 },
            { name: "producto3", price: 300 },
          ],
          name: "price",
        })
        .then((res) => {
          expect(res.body.result).to.be.deep.equal([100, 200, 300]);
        });
    });
    it("responds with names", () => {
      agent
        .post("/pluck")
        .send({
          array: [
            { name: "producto1", price: 100 },
            { name: "producto2", price: 200 },
            { name: "producto3", price: 300 },
          ],
          name: "name",
        })
        .then((res) => {
          expect(res.body.result).to.be.deep.equal([
            "producto1",
            "producto2",
            "producto3",
          ]);
        });
    });
  });
});

// [2,5,7,10,11,15,20]
//      i
//                 x
