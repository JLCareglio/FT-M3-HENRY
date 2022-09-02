const expect = require('chai').expect

// importamos las funciones que vamos a testear'
const Model = require('../models/model')

describe('---------- `addProduct` y `listProducts` ----------', function () {
    beforeEach(function () {
        Model.reset()
      })
      
    it('Inicialmente devuelve un arreglo vacío', function () {
      expect(Model.listProducts()).to.eql([])
    })

    it('Agrega productos al arreglo', function () {
      Model.addCategory('Celulares')
      Model.addProduct('iPhone 13 Pro', 'Apple', 'Celulares', 8)
      expect(Model.listProducts()).to.have.length(1)
      Model.addProduct('iPhone 12 Mini', 'Apple', 'Celulares', 14)
      expect(Model.listProducts()).to.have.length(2)
    })

    it('Si la categoría no existe, no agrega el producto y arroja un mensaje de error', function () {
      Model.addCategory('Auriculares')
      expect(() => Model.addProduct('iPhone 13 Pro', 'Apple', 'Celulares', 8)).to.throw('La categoría ingresada no existe')
      expect(Model.listProducts()).to.have.length(0)
    })

    it('Debe guardar el número (id) de la categoría y no su nombre', function () {
      Model.addCategory('Celulares')
      Model.addProduct('iPhone 13 Pro', 'Apple', 'Celulares', 8)
      expect(Model.listProducts()).to.have.length(1)
      expect(Model.listProducts()[0].categoryId).to.eql(1)
      Model.addCategory('Auriculares')
      Model.addProduct('Sony', 'Wh-1000xm4', 'Auriculares', 15)
      expect(Model.listProducts()).to.have.length(2)
      expect(Model.listProducts()[1].categoryId).to.eql(2)
    })

    it('Su propiedad stock debe ser un número', function () {
      Model.addCategory('Celulares')
      Model.addProduct('iPhone 13 Pro', 'Apple', 'Celulares', 8)
      expect(Model.listProducts()).to.have.length(1)
      expect(Model.listProducts()[0].stock).to.eql(8)
      Model.addCategory('Auriculares')
      Model.addProduct('Wh-1000xm4', 'Sony', 'Auriculares', 15)
      expect(Model.listProducts()).to.have.length(2)
      expect(Model.listProducts()[1].stock).to.eql(15)
    })

    it('Su propiedad available debe ser un booleano de acuerdo al stock', function () {
      Model.addCategory('Celulares')
      Model.addProduct('iPhone 13 Pro', 'Apple', 'Celulares', 8)
      expect(Model.listProducts()[0].available).to.eql(true)
      Model.addProduct('1100', 'Nokia', 'Celulares', 0)
      expect(Model.listProducts()[1].available).to.eql(false)
    })

    it('Inicialmente las reseñas de los productos deben ser arreglos vacíos', function () {
      Model.addCategory('Celulares')
      Model.addProduct('iPhone 13 Pro', 'Apple', 'Celulares', 8)
      expect(Model.listProducts()).to.have.length(1)
      expect(Model.listProducts()[0].reviews).to.eql([])
      Model.addCategory('Auriculares')
      Model.addProduct('Wh-1000xm4', 'Sony', 'Auriculares', 15)
      expect(Model.listProducts()).to.have.length(2)
      expect(Model.listProducts()[1].reviews).to.eql([])
    })

    it('Su propiedad rating (puntaje) será inicialmente 0', function () {
      Model.addCategory('Celulares')
      Model.addProduct('iPhone 13 Pro', 'Apple', 'Celulares', 8)
      expect(Model.listProducts()).to.have.length(1)
      expect(Model.listProducts()[0].rating).to.eql(0)
      Model.addCategory('Auriculares')
      Model.addProduct('Wh-1000xm4', 'Sony', 'Auriculares', 15)
      expect(Model.listProducts()).to.have.length(2)
      expect(Model.listProducts()[1].rating).to.eql(0)
    })

    it('Si recibe un nombre de categoría como parámetro debería filtrar solo los productos de ella', function () {
      Model.addCategory('Celulares')
      Model.addCategory('Auriculares')
      Model.addProduct('iPhone 13 Pro', 'Apple', 'Celulares', 8)
      Model.addProduct('S20', 'Samsung', 'Celulares', 11)
      Model.addProduct('Wh-1000xm4', 'Sony', 'Auriculares', 15)
      expect(Model.listProducts('Celulares')).to.have.length(2)
      expect(Model.listProducts('Celulares')[0].name).to.eql('iPhone 13 Pro')
      expect(Model.listProducts('Celulares')[1].name).to.eql('S20')
      expect(Model.listProducts('Auriculares')).to.have.length(1)
      expect(Model.listProducts('Auriculares')[0].name).to.eql('Wh-1000xm4')
    })

    it('Si la categoría no existe, debe arrojar un error', function () {
      Model.addCategory('Celulares')
      expect(() => Model.listProducts('Auriculares')).to.throw('La categoría no existe')
    })

    it('Si recibe un segundo parámetro en true debe devolver únicamente marca y nombre de los productos', function () {
      Model.addCategory('Celulares')
      Model.addCategory('Auriculares')
      Model.addProduct('iPhone 13 Pro', 'Apple', 'Celulares', 8)
      Model.addProduct('S20', 'Samsung', 'Celulares', 11)
      Model.addProduct('Wh-1000xm4', 'Sony', 'Auriculares', 15)
      expect(Model.listProducts('Celulares', true)).to.have.length(2)
      expect(Model.listProducts('Celulares', true)[0]).to.eql('Apple iPhone 13 Pro')
      expect(Model.listProducts('Celulares', true)[1]).to.eql('Samsung S20')
      expect(Model.listProducts('Auriculares', true)).to.have.length(1)
      expect(Model.listProducts('Auriculares', true)[0]).to.eql('Sony Wh-1000xm4')
    })
  })