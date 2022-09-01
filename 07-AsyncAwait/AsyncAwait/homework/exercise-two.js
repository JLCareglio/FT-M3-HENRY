"use strict";

var Promise = require("bluebird"),
  async = require("async"),
  exerciseUtils = require("./utils");

var readFile = exerciseUtils.readFile,
  promisifiedReadFile = exerciseUtils.promisifiedReadFile,
  blue = exerciseUtils.blue,
  magenta = exerciseUtils.magenta;

var args = process.argv.slice(2).map(function (st) {
  return st.toUpperCase();
});

module.exports = {
  problemA: problemA,
  problemB: problemB,
  problemC: problemC,
  problemD: problemD,
};

// corre cada problema dado como un argumento del command-line para procesar
args.forEach(function (arg) {
  var problem = module.exports["problem" + arg];
  if (problem) problem();
});

async function myReadFileAsync(file) {
  blue(await promisifiedReadFile(file));
}

async function problemA() {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   * A. loggea el poema dos stanza uno y stanza dos en cualquier orden
   *    pero loggea 'done' cuando ambos hayan terminado
   *    (ignora errores)
   *    nota: lecturas ocurriendo paralelamente (en simultaneo)
   * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  // AsyncAwait version 1
  // const stanzas = await Promise.all([
  //   promisifiedReadFile("poem-two/stanza-01.txt"),
  //   promisifiedReadFile("poem-two/stanza-02.txt"),
  // ]);
  // stanzas.forEach((stanza) => blue(stanza));
  // console.log("done");

  // AsyncAwait version 2 orden aleatorio
  await Promise.all([
    myReadFileAsync("poem-two/stanza-01.txt"),
    myReadFileAsync("poem-two/stanza-02.txt"),
  ]);
  console.log("done");
}

async function problemB() {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   * B. loggea todas las stanzas en poema dos, en cualquier orden y loggea
   *    'done' cuando todas hayan terminado
   *    (ignora errores)
   *    nota: las lecturas ocurren en paralelo (en simultaneo)
   * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  var filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
    return "poem-two/" + "stanza-0" + n + ".txt";
  });

  // AsyncAwait version
  // const stanzas = await Promise.all(
  //   filenames.map((fileName) => promisifiedReadFile(fileName))
  // );
  // stanzas.forEach((stanza) => blue(stanza));
  // console.log("done");

  // // AsyncAwait version 2 orden aleatorio
  const arrayAwait = filenames.map((fileName) => myReadFileAsync(fileName));
  await Promise.all(arrayAwait);
  console.log("done");
}

async function problemC() {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   * C. Lee y loggea todas las stanzas en el poema dos, *en orden* y
   *    loggea 'done cuando hayan terminado todas
   *    (ignorá errores)
   *    nota: las lecturas ocurren en serie (solo cuando las previas
   *    hayan terminado)
   * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  var filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
    return "poem-two/" + "stanza-0" + n + ".txt";
  });

  // AsyncAwait version
  for (const fileName of filenames) await myReadFileAsync(fileName);
  console.log("done");
}

async function problemD() {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   * D. loggea todas las stanzas en el poema dos *en orden* asegurandote
   *    de fallar para cualquier error y logueando un 'done cuando todas
   *    hayan terminado
   *    nota: las lecturas ocurren en serie (solo cuando las previas
   *    hayan terminado)
   * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  var filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
    return "poem-two/" + "stanza-0" + n + ".txt";
  });
  var randIdx = Math.floor(Math.random() * filenames.length);
  filenames[randIdx] = "wrong-file-name-" + (randIdx + 1) + ".txt";

  // AsyncAwait version
  try {
    for (const fileName of filenames) await myReadFileAsync(fileName);
  } catch (err) {
    magenta(err);
  } finally {
    console.log("done");
  }
}
