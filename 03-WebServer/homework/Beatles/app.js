const http = require("http");
const {
  showHome,
  getBeatles,
  getBeatle,
  showBeatle,
  showError404,
} = require("./controlador");

const routes = {
  "/": showHome,
  "/home": showHome,
  "/home/": showHome,
  "/api": getBeatles,
  "/api/": getBeatles,
};

http
  .createServer((req, res) => {
    const url = req.url.toLowerCase();
    if (routes[url]) routes[url](req, res);
    else if (url.substring(0, 5) === "/api/") getBeatle(req, res);
    else if (url.includes("20")) showBeatle(req, res);
    else showError404(res);
  })
  .listen(8080, "127.0.0.1");
