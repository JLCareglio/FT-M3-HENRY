const supertest = require('supertest-as-promised')(require('../app'))
const expect = require('chai').expect
const model = require('../models/model')

  describe('/users/plan', function () {
      beforeEach(function () {
          model.reset()
        })
    it('PATCH alterna el tipo de plan de un usuario existente', function () {
      model.addUser('wan@henryflix.com', 'Wanda')
      return supertest
        .patch('/users/plan?user=wan@henryflix.com')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          expect(res.body).to.eql({ msg: 'Wanda, ahora tienes el plan premium' })
          expect(model.listUsers()[0].plan).to.have.eql('premium')
        })
    })

    it('PATCH si el usuario no existe, responde con el error', function () {
      return supertest
        .patch('/users/plan?user=wan@henryflix.com')
        .expect(404)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          expect(res.body).to.eql({ error: 'Usuario inexistente' })
        })
    })
  })