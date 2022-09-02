const expect = require('chai').expect

const Model = require('../models/model')


  describe('---------- `addSerie` y `listSeries` ----------', function () {
    beforeEach(function () {
      Model.reset()
    })
  
    it('Inicialmente devuelve un arreglo vacío', function () {
      expect(Model.listSeries()).to.eql([])
    })

    it('Agrega series al arreglo', function () {
      Model.addSerie('The Office', 9, 'regular', 2005)
      expect(Model.listSeries()).to.have.length(1)
    })

    it('Su propiedad <seasons> debe ser un número', function () {
      Model.addSerie('The Office', 9, 'regular', 2005)
      expect(Model.listSeries()).to.have.length(1)
      expect(Model.listSeries()[0].seasons).to.eql(9)
      Model.addSerie('How I Met Your Mother', 9, 'premium', 2005)
      expect(Model.listSeries()).to.have.length(2)
      expect(Model.listSeries()[1].seasons).to.eql(9)
      Model.addSerie('The Big Bang Theory', 12, 'regular', 2007)
      expect(Model.listSeries()).to.have.length(3)
      expect(Model.listSeries()[2].seasons).to.eql(12)
    })

    it('Su propiedad <rating> será inicialmente 0', function () {
      Model.addSerie('The Office', 9, 'regular', 2005)
      expect(Model.listSeries()).to.have.length(1)
      expect(Model.listSeries()[0].rating).to.eql(0)
    })

    it('Si la serie ya existe, no la agrega y arrojar un error', function () {
      Model.addSerie('The Office', 9, 'regular', 2005)
      expect(Model.listSeries()).to.have.length(1)
      expect(() => Model.addSerie('The Office', 9, 'regular', 2005)).to.throw('La serie The Office ya existe')
      expect(Model.listSeries()).to.have.length(1)
    })

    it('Si la categoría no existe, arroja un error y no agrega la serie', function () {
      expect(() => Model.addSerie('Stranger Things', 3, 'plus', 2016)).to.throw('La categoría plus no existe')
      expect(Model.listSeries()).to.have.length(0)
    })

    it('En caso de recibir un parámetro (regular o premium), devuelve sólo las series correspondientes', function () {
      Model.addSerie('The Office', 9, 'regular', 2005)
      Model.addSerie('How I Met Your Mother', 9, 'premium', 2005)
      Model.addSerie('The Big Bang Theory', 12, 'regular', 2007)
      expect(Model.listSeries('regular')).to.have.length(2)
      expect(Model.listSeries('premium')).to.have.length(1)
    })

    it('Si la categoría no existe, arroja un error', function () {
      expect(() => Model.listSeries('plus')).to.throw('La categoría plus no existe')
    })
  })