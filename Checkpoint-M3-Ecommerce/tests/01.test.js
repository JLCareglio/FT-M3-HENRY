const expect = require('chai').expect

// importamos las funciones que vamos a testear'
const Model = require('../models/model')
describe('---------- `addCategory` y `listCategories` ----------', function () {
    beforeEach(function () {
        Model.reset()
      })
      
    it('Inicialmente devuelve un arreglo de categorías vacío', function () {
      expect(Model.listCategories()).to.eql([])
    })

    it('Agrega categorías a la lista y devuelve un mensaje de confirmación', function () {
      Model.addCategory('Celulares')
      expect(Model.listCategories()).to.have.length(1)
      expect(Model.addCategory('Auriculares')).to.eql('Categoría creada correctamente')
      expect(Model.listCategories()).to.have.length(2)
    })

    it('Si la categoría ya existe, no se agrega a la lista y devuelve un error', function () {
      Model.addCategory('Celulares')
      expect(Model.listCategories()).to.have.length(1)
      Model.addCategory('Auriculares')
      expect(Model.listCategories()).to.have.length(2)
      expect(() => Model.addCategory('Auriculares')).to.throw('La categoría ya existe')
      expect(Model.listCategories()).to.have.length(2)
    })
  })