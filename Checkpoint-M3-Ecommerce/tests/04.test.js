const expect = require('chai').expect

// importamos las funciones que vamos a testear'
const Model = require('../models/model')

describe('---------- `getRating` ----------', function () {
    beforeEach(function () {
        Model.reset()
      })
      
    it('Devuelve el rating de un producto', function () {
      Model.addCategory('Celulares')
      Model.addProduct('iPhone 13 Pro', 'Apple', 'Celulares', 8)
      expect(Model.getRating('iPhone 13 Pro')).to.eql(0)
    })

    it('Si el producto no existe, arroja un error', function () {
      expect(() => Model.getRating('iPhone 13 Pro')).to.throw('Producto no encontrado')
    })

    it('Si no recibe argumentos, devuelve el nombre de los 5 mejores productos', function () {
      Model.addCategory('Celulares')
      Model.addCategory('Auriculares')
      Model.addProduct('Wh-1000xm4', 'Sony', 'Auriculares', 15)
      Model.addReview('Wh-1000xm4', 5, 'Una locura', 'Hernán')
      Model.addProduct('iPhone 13 Pro', 'Apple', 'Celulares', 8)
      Model.addReview('iPhone 13 Pro', 4.5, 'Buenaso', 'Toni')
      Model.addProduct('Note 10', 'Xiaomi', 'Celulares', 14)
      Model.addReview('Note 10', 4, 'Juega', 'Monas')
      Model.addProduct('A71', 'Samsung', 'Celulares', 6)
      Model.addReview('A71', 3.5, 'Me sirve', 'Nahuel')
      Model.addProduct('1100', 'Nokia', 'Celulares', 1)
      Model.addReview('1100', 3, 'Sigue vigente', 'Fede')
      Model.addProduct('S20', 'Samsung', 'Celulares', 11)
      Model.addReview('S20', 2, 'No me convence', 'Mati')
      Model.addProduct('Airpods', 'Apple', 'Auriculares', 3)
      Model.addReview('Airpods', 1, 'Re salados', 'Minister')
      expect(Model.getRating()).to.eql(['Wh-1000xm4', 'iPhone 13 Pro', 'Note 10', 'A71', '1100'])
    })
  })