const supertest = require('supertest-as-promised')(require('../app'))
const expect = require('chai').expect
const model = require('../models/model')


describe('/watchAgain', function () {
    
    beforeEach(function () {
        model.reset()
      })

    it('GET responde con las series ya vistas por el usuario que recibe por query', function () {
      model.addSerie('The Office', 9, 'regular', 2005)
      model.addSerie('How I Met Your Mother', 9, 'premium', 2005)
      model.addSerie('Seinfeld', 9, 'regular', 1989)
      model.addSerie('The Big Bang Theory', 12, 'regular', 2007)
      model.addUser('mora@henryflix.com', 'Mora')
      model.play('The Big Bang Theory', 'mora@henryflix.com')
      model.play('The Office', 'mora@henryflix.com')
      return supertest
        .get('/watchAgain?user=mora@henryflix.com')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          expect(res.body).to.deep.eql(['The Big Bang Theory', 'The Office'])
          expect(model.listSeries()).to.have.length(4)
        })
    })

    it('GET Si el usuario no existe, responde con un error', function () {
      return supertest
        .get('/watchAgain?user=mora@henryflix.com')
        .expect(404)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          expect(res.body).to.deep.eql({ error: 'Usuario inexistente' })
        })
    })
  })