const expect = require('chai').expect

const Model = require('../models/model')



describe('---------- `play` ----------', function () {
  beforeEach(function () {
    Model.reset()
  })
    it('Si el usuario no existe, arroja un error', function () {
      expect(() => Model.play('The Office', 'elena@henryflix.com')).to.throw('Usuario inexistente')
    })

    it('Si la serie no existe, arroja un error', function () {
      Model.addUser('elena@henryflix.com', 'Elena')
      expect(() => Model.play('The Office', 'elena@henryflix.com')).to.throw('Serie inexistente')
    })

    it('Si la serie es "premium" y el usuario no tiene dicho plan, arroja un error', function () {
      Model.addUser('elena@henryflix.com', 'Elena')
      Model.addSerie('How I Met Your Mother', 9, 'premium', 2005)
      expect(() => Model.play('How I Met Your Mother', 'elena@henryflix.com')).to.throw('Contenido no disponible, contrata ahora HenryFlix Premium!')
    })

    it('"Reproduce" una serie y devuelve un mensaje de confirmación', function () {
      Model.addSerie('The Office', 9, 'regular', 2005)
      Model.addSerie('How I Met Your Mother', 9, 'premium', 2005)
      Model.addUser('elena@henryflix.com', 'Elena')
      expect(Model.play('The Office', 'elena@henryflix.com')).to.eql('Reproduciendo The Office')
      Model.switchPlan('elena@henryflix.com')
      expect(Model.play('How I Met Your Mother', 'elena@henryflix.com')).to.eql('Reproduciendo How I Met Your Mother')
    })

    it('Guarda el registro de la serie vista en la propiedad <watched> del usuario', function () {
      Model.addSerie('The Big Bang Theory', 12, 'regular', 2007)
      Model.addSerie('The Office', 9, 'regular', 2005)
      Model.addUser('martu@henryflix.com', 'Martu')
      Model.play('The Big Bang Theory', 'martu@henryflix.com')
      expect(Model.listUsers()[0].watched[0]).to.eql('The Big Bang Theory')
      Model.play('The Office', 'martu@henryflix.com')
      expect(Model.listUsers()[0].watched[1]).to.eql('The Office')
    })
  })