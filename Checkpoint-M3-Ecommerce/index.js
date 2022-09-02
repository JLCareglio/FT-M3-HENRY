const app = require('./app')
//NO ESCRIBIR EN ESTE ARCHIVO,
//Para evitar algun problema de tipo EADDRINUSE con mocha watch + supertest + npm test.
//agreguen rutas y middlewares en ./app.js
app.listen(3000, () => console.log('Servidor levantado en el puerto 3000'));
