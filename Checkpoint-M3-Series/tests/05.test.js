const expect = require('chai').expect

const Model = require('../models/model')
describe('---------- `watchAgain` ----------', function () {
  beforeEach(function () {
    Model.reset()
  })
    it('Si el usuario no existe, arroja un error', function () {
      expect(() => Model.watchAgain('flor@henryflix.com')).to.throw('Usuario inexistente')
    })

    it('Devuelve las series ya vistas por el usuario', function () {
      Model.addSerie('The Office', 9, 'regular', 2005)
      Model.addSerie('How I Met Your Mother', 9, 'premium', 2005)
      Model.addSerie('The Big Bang Theory', 12, 'regular', 2007)
      Model.addUser('mora@henryflix.com', 'Mora')
      Model.switchPlan('mora@henryflix.com')
      Model.play('The Big Bang Theory', 'mora@henryflix.com')
      Model.play('The Office', 'mora@henryflix.com')
      Model.play('How I Met Your Mother', 'mora@henryflix.com')
      expect(Model.watchAgain('mora@henryflix.com')).to.eql(['The Big Bang Theory', 'The Office', 'How I Met Your Mother'])
    })
  })