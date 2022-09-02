const expect = require('chai').expect

const Model = require('../models/model')


  describe('---------- `switchPlan` ----------', function () {
    beforeEach(function () {
      Model.reset()
    })
  
    it('Cambia el plan del usuario indicado (regular >> premium >> regular)', function () {
      Model.addUser('wan@henryflix.com', 'Wanda')
      expect(Model.switchPlan('wan@henryflix.com')).to.eql('Wanda, ahora tienes el plan premium')
      expect(Model.switchPlan('wan@henryflix.com')).to.eql('Wanda, ahora tienes el plan regular')
    })

    it('Si el usuario no existe, arroja un error', function () {
      expect(() => Model.switchPlan('wan@henryflix.com')).to.throw('Usuario inexistente')
    })
  })