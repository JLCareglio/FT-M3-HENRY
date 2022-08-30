"use strict";
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:

class $Promise {
  constructor(executor) {
    if (typeof executor !== "function")
      throw new TypeError("executor no es una function");
    this._state = "pending";
    this._value;
    this._handlerGroups = [];
    executor(this._internalResolve.bind(this), this._internalReject.bind(this));
  }
  _internalResolve(data) {
    if (this._state === "pending") {
      this._value = data;
      this._state = "fulfilled";
      this._callHandlers();
    }
  }
  _internalReject(reason) {
    if (this._state === "pending") {
      this._value = reason;
      this._state = "rejected";
      this._callHandlers();
    }
  }
  then(successCb, errorCb) {
    if (typeof successCb !== "function") successCb = null;
    if (typeof errorCb !== "function") errorCb = null;
    const downstreamPromise = new $Promise(function () {});
    this._handlerGroups.push({ successCb, errorCb, downstreamPromise });
    if (this._state !== "pending") this._callHandlers();
    return downstreamPromise;
  }
  _callHandlers() {
    while (this._handlerGroups.length > 0) {
      const handlers = this._handlerGroups.shift();
      if (this._state === "fulfilled") {
        if (!handlers.successCb)
          handlers.downstreamPromise._internalResolve(this._value);
        else {
          try {
            const resultado = handlers.successCb(this._value);
            if (resultado instanceof $Promise)
              resultado.then(
                (value) => handlers.downstreamPromise._internalResolve(value),
                (err) => handlers.downstreamPromise._internalReject(err)
              );
            else handlers.downstreamPromise._internalResolve(resultado);
          } catch (error) {
            handlers.downstreamPromise._internalReject(error);
          }
        }
      }

      if (this._state === "rejected") {
        if (!handlers.errorCb)
          handlers.downstreamPromise._internalReject(this._value);
        else {
          try {
            const resultado = handlers.errorCb(this._value);
            if (resultado instanceof $Promise)
              resultado.then(
                (value) => handlers.downstreamPromise._internalResolve(value),
                (err) => handlers.downstreamPromise._internalReject(err)
              );
            else handlers.downstreamPromise._internalResolve(resultado);
          } catch (error) {
            handlers.downstreamPromise._internalReject(error);
          }
        }
      }
    }
  }
  catch = (errorCb) => this.then(null, errorCb);
}

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
