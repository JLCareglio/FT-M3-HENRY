const utils = require("../utils");
/*
    3️⃣ ***EJERCICIO 4*** - deleteBook 3️⃣
        ❕ CONSIGNA ❕
        
    1 - Buscar el libro por id, eliminarlo y responder con los libros teniendo en cuenta que no esta mas el que eliminamos.
    
    2 - Si no existe un libro con ese id,
    arrojar un Error. ej: Error(`no existe el libro con id: 10`)
    
      📢 PUNTOS A TENER EN CUENTA 📢
    - Nuestros libros se van a encontrar en un array que inicialmente lo vas a ver vacio pero a medida que se agreguen libros va a ser un array de objetos.Este mismo se encuentra en nuestro archivo utils.

    - Dentro del array de utils es donde debemos buscar nuestros libros
  
    */

const deleteBook = (id) => {
  // ⚠️ No modificar nada arriba de esta línea ⚠️
  const i = utils.books.findIndex((b) => b.id === id);
  if (i === -1) throw `no existe el libro con id: ${id}`;
  else utils.books.splice(i, 1);
  return utils.books;
};

// ⚠️ No modificar nada debajo de esta línea ⚠️
module.exports = deleteBook;
