const { faker } = require('@faker-js/faker');
// ⚠️ NO MODIFICAR ESTE ARCHIVO ⚠️
// Acá les proveemos las funciones esenciales para que
// puedan hacer el checkpoint
 module.exports = {
  books: [],

  reset: function () {
    this.books = [];
  },

  testBooks: function() {
    return this.books;
  },
// Genera un nuevo libro con fakerjs, si es necesario, se pueden pisar los valores en los test despues
// Para forzar ciertos casos
  generateBook: function() {
    const stock = faker.datatype.number(2, 0)
    return {
      id: faker.datatype.uuid(),
      name: faker.company.name(),
      author: faker.name.fullName(),
      stock,
      available: stock <= 0 ? false : true,
      rating: faker.datatype.number({ max: 100 }),
      admission: `${faker.date.past()}`,
      // Este valor se puede pisar cuando haga falta al igual que cualquier otro
      genre: faker.music.genre()
    }
  }
}