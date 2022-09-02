const expect = require('chai').expect

const Model = require('../models/model')

describe('---------- `rateSerie` ----------', function () {
  beforeEach(function () {
    Model.reset()
  })
    it('Actualiza el puntaje de la serie y devuelve un mensaje de confirmación', function () {
      Model.addSerie('The Office', 9, 'regular', 2005)
      Model.addUser('martu@henryflix.com', 'Martu')
      Model.addUser('mora@henryflix.com', 'Mora')
      Model.addUser('wan@henryflix.com', 'Wanda')
      Model.play('The Office', 'martu@henryflix.com')
      Model.play('The Office', 'mora@henryflix.com')
      Model.play('The Office', 'wan@henryflix.com')
      expect(Model.rateSerie('The Office', 'martu@henryflix.com', 5)).to.eql('Le has dado 5 puntos a la serie The Office')
      expect(Model.rateSerie('The Office', 'mora@henryflix.com', 3)).to.eql('Le has dado 3 puntos a la serie The Office')
      expect(Model.rateSerie('The Office', 'wan@henryflix.com', 4)).to.eql('Le has dado 4 puntos a la serie The Office')
      expect(Model.listSeries()[0].reviews.length).to.eql(3)
      expect(Model.listSeries()[0].rating).to.eql(4)
    })

    it('Si el usuario no existe, arroja un error y no actualiza el puntaje', function () {
      Model.addUser('martu@henryflix.com', 'Martu')
      Model.addSerie('The Office', 9, 'regular', 2005)
      expect(() => Model.rateSerie('The Office', 'flor@henryflix.com', 5)).to.throw('Usuario inexistente')
      expect(Model.listSeries()[0].reviews).to.eql([])
      expect(Model.listSeries()[0].rating).to.eql(0)
    })

    it('Si la serie no existe, arroja un error y no actualiza el puntaje', function () {
      Model.addUser('martu@henryflix.com', 'Martu')
      Model.addSerie('The Big Bang Theory', 12, 'regular', 2007)
      expect(() => Model.rateSerie('The Office', 'martu@henryflix.com', 5)).to.throw('Serie inexistente')
      expect(Model.listSeries()[0].reviews).to.eql([])
      expect(Model.listSeries()[0].rating).to.eql(0)
    })

    it('Si el puntaje no es de 1 a 5, arroja un error y no actualiza el puntaje', function () {
      Model.addUser('martu@henryflix.com', 'Martu')
      Model.addSerie('The Office', 9, 'regular', 2005)
      expect(() => Model.rateSerie('The Office', 'martu@henryflix.com', 6)).to.throw('Puntaje inválido')
      expect(Model.listSeries()[0].reviews).to.eql([])
      expect(Model.listSeries()[0].rating).to.eql(0)
    })

    it('Si el usuario no reprodujo la serie, devuelve un error y no actualiza el puntaje', function () {
      Model.addUser('martu@henryflix.com', 'Martu')
      Model.addSerie('The Office', 9, 'regular', 2005)
      expect(() => Model.rateSerie('The Office', 'martu@henryflix.com', 5)).to.throw('Debes reproducir el contenido para poder puntuarlo')
      expect(Model.listSeries()[0].reviews).to.eql([])
      expect(Model.listSeries()[0].rating).to.eql(0)
    })
  })