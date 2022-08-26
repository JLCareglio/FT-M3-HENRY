"use strict";
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:

// class $Promise {
//   constructor(executor) {
//     if (typeof executor !== "function")
//       throw new TypeError("executor no es una function");
//     this._state = "pending";
//     this._value;
//     executor(this._internalResolve.bind(this), this._internalReject.bind(this));
//   }
// }

function $Promise(executor) {
  if (typeof executor !== "function")
    throw new TypeError("executor no es una function");
  this._state = "pending";
  this._value;
  this._handlerGroups = [];
  executor(this._internalResolve.bind(this), this._internalReject.bind(this));
}

$Promise.prototype._internalResolve = function (data) {
  if (this._state === "pending") {
    this._value = data;
    this._state = "fulfilled";
    this._callHandlers();
  }
};

$Promise.prototype._internalReject = function (reason) {
  if (this._state === "pending") {
    this._value = reason;
    this._state = "rejected";
    this._callHandlers();
  }
};

$Promise.prototype.then = function (successCb, errorCb) {
  if (typeof successCb !== "function") successCb = null;
  if (typeof errorCb !== "function") errorCb = null;
  this._handlerGroups.push({ successCb, errorCb });
  if (this._state !== "pending") this._callHandlers();
};

$Promise.prototype._callHandlers = function () {
  while (this._handlerGroups.length > 0) {
    const handle = this._handlerGroups.shift();
    if (this._state === "fulfilled")
      handle.successCb && handle.successCb(this._value);
    if (this._state === "rejected")
      handle.errorCb && handle.errorCb(this._value);
  }
};

$Promise.prototype.catch = function (errorCb) {
  this.then(null, errorCb);
};

module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
