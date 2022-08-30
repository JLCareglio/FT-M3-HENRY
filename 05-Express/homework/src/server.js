// const bodyParser = require("body-parser");
const express = require("express");
const bodyParser = require("body-parser");
const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [];

const server = express();
// to enable parsing of json bodies for post requests
server.use(express.json());
// server.use(bodyParser.json())

// TODO: your code to handle requests
let id = 0;

server.post("/posts", (req, res) => {
  const { author, title, contents } = req.body;
  if (!author || !title || !contents)
    res.status(STATUS_USER_ERROR).json({
      error: "No se recibieron los parámetros necesarios para crear el Post",
    });
  else {
    const post = { author, title, contents, id: id++ };
    posts.push(post);
    res.json(post);
  }
});

server.post("/posts/author/:author", (req, res) => {
  const { title, contents } = req.body;
  const author = req.params.author;
  if (!author || !title || !contents)
    res.status(STATUS_USER_ERROR).json({
      error: "No se recibieron los parámetros necesarios para crear el Post",
    });
  else {
    const post = { author, title, contents, id: id++ };
    posts.push(post);
    res.json(post);
  }
});

server.get("/posts", (req, res) => {
  const { term } = req.query;
  if (term) {
    const coincidencias = posts.filter(
      (p) => p.title.includes(term) || p.contents.includes(term)
    );
    if (coincidencias.length > 0) return res.json(coincidencias);
  } else res.json(posts);
});

server.get("/posts/:author", (req, res) => {
  const author = req.params.author;
  const coincidencias = posts.filter((p) => p.author === author);
  if (coincidencias.length > 0) res.json(coincidencias);
  else
    res
      .status(STATUS_USER_ERROR)
      .json({ error: "No existe ningun post del autor indicado" });
});

server.get("/posts/:author/:title", (req, res) => {
  const { author, title } = req.params;
  const coincidencias = posts.filter(
    (p) => p.author === author && p.title === title
  );
  if (coincidencias.length > 0) res.json(coincidencias);
  else
    res.status(STATUS_USER_ERROR).json({
      error: "No existe ningun post con dicho titulo y autor indicado",
    });
});

server.put("/posts", (req, res) => {
  const { id, title, contents } = req.body;
  if (!id || !title || !contents)
    res.status(STATUS_USER_ERROR).json({
      error:
        "No se recibieron los parámetros necesarios para modificar el Post",
    });
  else {
    const coincidencia = posts.find((p) => p.id == id);
    if (!coincidencia)
      res.status(STATUS_USER_ERROR).json({
        error: "No se encontró ningún Post con el id especificado",
      });
    else {
      coincidencia.title = title;
      coincidencia.contents = contents;
      res.json(coincidencia);
    }
  }
});

server.delete("/posts", (req, res) => {
  const id = req.body.id;
  if (!id) return res.status(STATUS_USER_ERROR).json({ error: "ID invalido" });
  const coincidencia = posts.find((p) => p.id == id);
  if (!coincidencia)
    return res
      .status(STATUS_USER_ERROR)
      .json({ error: "No se encontró ningún Post con el id especificado" });
  else {
    posts = posts.filter((p) => p.id != id);
    res.json({ success: true });
  }
});

server.delete("/author", (req, res) => {
  const author = req.body.author;
  if (!author)
    return res.status(STATUS_USER_ERROR).json({ error: "author invalido" });
  const coincidencia = posts.find((p) => p.author === author);
  if (!coincidencia)
    res
      .status(STATUS_USER_ERROR)
      .json({ error: "No existe el autor indicado" });
  else {
    const eliminados = [];
    posts = posts.filter((p) => {
      if (p.author !== author) return true;
      else eliminados.push(p);
    });
    res.json(eliminados);
  }
});

module.exports = { posts, server };
