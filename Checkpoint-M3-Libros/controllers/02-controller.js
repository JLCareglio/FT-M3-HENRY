const utils = require("../utils");
/*
  2️⃣ ***EJERCICIO 2*** listBooks 2️⃣
    ❕ CONSIGNA ❕
  1 - Retornar todos los libros de la base de datos utils.books
  2 - Si no hay libros en la base de datos, devolver un error que diga ("no hay libros en la base de datos") (investigar throw Error)
  📢 PUNTOS A TENER EN CUENTA 📢
  - Pueden acceder a los libros a través de utils.books
*/
const listBooks = () => {
  // ⚠️ No modificar nada arriba de esta línea ⚠️
  if (utils.books.length > 0) return utils.books;
  else throw "no hay libros en la base de datos";
};

// ⚠️ No modificar nada debajo de esta línea ⚠️
module.exports = listBooks;
