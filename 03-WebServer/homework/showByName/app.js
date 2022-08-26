var fs = require("fs");
var http = require("http");

// Escribí acá tu servidor

http
  .createServer(function (req, res) {
    // console.log(req.url);
    // logica
    if (req.url === "/") {
      res.writeHead(201, { "Content-Type": "application/json" });

      const obj = {
        msg: "Intenta buscar los siguientes nombres de doges :)",
        names: ["arcoiris", "badboy", "code", "resaca", "retrato", "sexy"],
      };

      res.end(JSON.stringify(obj));
    } else {
      fs.readFile(`./images${req.url}_doge.jpg`, (err, lecturaImg) => {
        if (err) {
          res.writeHead(404);
          res.end(`${req.url} no arrojó resultados :( `);
        } else {
          res.writeHead(200);
        //   console.log(lecturaImg);
          res.end(lecturaImg);
        }
      });
    }
  })
  .listen(3000, console.log("Running on PORT 3000"));








