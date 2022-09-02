const expect = require('chai').expect

// importamos las funciones que vamos a testear'
const Model = require('../models/model')

describe('---------- `addReview`, `getReviews` ----------', function () {
    beforeEach(function () {
        Model.reset()
      })
      
    it('Devuelve un arreglo vacío si el producto no tiene reseñas', function () {
      Model.addCategory('Celulares')
      Model.addProduct('iPhone 13 Pro', 'Apple', 'Celulares', 8)
      expect(Model.getReviews('iPhone 13 Pro')).to.eql([])
    })

    it('Si el producto no existe, arroja un error', function () {
      expect(() => Model.getReviews('iPhone 13 Pro')).to.throw('Producto no encontrado')
    })

    it('Agrega un review al producto', function () {
      Model.addCategory('Celulares')
      Model.addProduct('iPhone 13 Pro', 'Apple', 'Celulares', 8)
      Model.addReview('iPhone 13 Pro', 5, 'Me sirve', 'Nahuel')
      expect(Model.getReviews('iPhone 13 Pro')).to.have.length(1)
      expect(Model.getReviews('iPhone 13 Pro')[0].text).to.eql('Me sirve')
      Model.addReview('iPhone 13 Pro', 4, 'Buenaso', 'Toni')
      expect(Model.getReviews('iPhone 13 Pro')).to.have.length(2)
      expect(Model.getReviews('iPhone 13 Pro')[1].text).to.eql('Buenaso')
    })

    it('Si el producto no existe, no se agrega la reseña y arroja un error', function () {
      expect(() => Model.addReview('iPhone 13 Pro', 5, 'Me sirve', 'Nahuel')).to.throw('Producto no encontrado')
    })

    it('Si el puntaje es inválido, no se agrega la reseña y arroja un error', function () {
      Model.addCategory('Celulares')
      Model.addProduct('iPhone 13 Pro', 'Apple', 'Celulares', 8)
      expect(() => Model.addReview('iPhone 13 Pro', 9, 'Lo mejor que me pasó en la vida', 'Minister')).to.throw('Puntaje inválido')
      expect(Model.getReviews('iPhone 13 Pro')).to.eql([])
    })

    it('Si no se le pasan todos los parámetros, no agrega la reseña y arroja un error', function () {
      Model.addCategory('Celulares')
      Model.addProduct('iPhone 13 Pro', 'Apple', 'Celulares', 8)
      expect(() => Model.addReview('iPhone 13 Pro', 4, 'Buenaso')).to.throw('Faltan parámetros')
      expect(Model.getReviews('iPhone 13 Pro')).to.eql([])
    })

    it('Calcula el rating del producto, promediando puntaje de reseñas, al agregar una nueva', function () {
      Model.addCategory('Celulares')
      Model.addProduct('iPhone 13 Pro', 'Apple', 'Celulares', 8)
      expect(Model.listProducts()[0].rating).to.eql(0)
      Model.addReview('iPhone 13 Pro', 4, 'Buenaso', 'Toni')
      expect(Model.listProducts()[0].rating).to.eql(4)
      Model.addReview('iPhone 13 Pro', 3, 'No me convence', 'Mati')
      expect(Model.listProducts()[0].rating).to.eql(3.5)
      Model.addReview('iPhone 13 Pro', 5, 'Me sirve', 'Nahuel')
      expect(Model.listProducts()[0].rating).to.eql(4)
    })
  })