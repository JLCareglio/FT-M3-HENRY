const router = require("express").Router();
const deleteBook = require("../controllers/04-controller");
// No modificar arriba de esta línea

/*
  1️⃣1️⃣ ***EJERCICIO 10*** DELETE /books 1️⃣1️⃣
      ❕ CONSIGNA ❕
    1 - Integrar la función deleteBook que desarrollaste previamente para eliminar un producto.
    
    2 - Responder con el los mensajes adecuados en el caso de que se haya eliminado con exito o en el caso de que hubiese un error.

    📢 PUNTOS A TENER EN CUENTA 📢
    - Si algo falla al crear el producto, debes responder con un status code 400 con el mensaje del error!
*/

// router.delete("/books", (req, res) => {});

// No modificar nada debajo de esta línea
module.exports = router;
