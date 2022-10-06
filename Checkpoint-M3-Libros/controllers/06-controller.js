const { generateBook } = require('../utils');
const utils = require('../utils');
 /*
    6️⃣ ***EJERCICIO 6*** - classifyBooks 6️⃣
    ❕ CONSIGNA ❕
    1 - Retorna un nuevo objeto clasificado por genero a partir de los generos existentes
    📢 PUNTOS A TENER EN CUENTA 📢
    - Si no hay libros disponibles, arrojar un Error('No hay libros disponibles')
    - Vas a necesitar extraer los géneros de los libros para obtenerlos
    EJEMPLO --> 
    Dado el siguiente siguiente array:
      [{
         nombreLibro: 'Sol',
         genero: 'Horror'
      }, {
         nombreLibro: 'Luna',
         genero: 'Fantasia'
      }, {
         nombreLibro: 'Tierra',
         genero: 'Fantasia'
      }]
   clasifyBooks() retorna --> {
      Horror: [{ nombreLibro: 'Sol', genero: 'Horror' }],
      Fantasia: [{ nombreLibro: 'Luna', genero: 'Fantasia' }, { nombreLibro: 'Tierra', genero: 'Fantasia' }]
   }
   Nota: Estos datos son de ejemplo, en los tests vendran otros campos.
   */
const classifyBooks = () => {
   // ⚠️ No modificar nada arriba de esta línea ⚠️
}

//⚠️ No modificar nada debajo de esta línea ⚠️
module.exports = classifyBooks;
