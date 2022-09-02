const supertest = require('supertest-as-promised')(require('../app'))
const expect = require('chai').expect
const model = require('../models/model')

describe('/play/:serie', function () {
    beforeEach(function () {
        model.reset()
      })
    it('GET responde con la serie que el usuario quiere ver, recibiendo la serie por params y el usuario por query', function () {
      model.addUser('ana@henryflix.com', 'Ana')
      model.addSerie('The Office', 9, 'regular', 2005)
      return supertest
        .get('/play/The Office?user=ana@henryflix.com')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          expect(res.body).to.deep.eql({ msg: 'Reproduciendo The Office' })
        })
    })

    it('GET si el usuario no existe, responde con un error', function () {
      model.addSerie('The Office', 9, 'regular', 2005)
      return supertest
        .get('/play/The Office?user=flor@henryflix.com')
        .expect(404)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          expect(res.body).to.deep.eql({ error: 'Usuario inexistente' })
        })
    })

    it('GET si la serie no existe, responde con un error', function () {
      model.addUser('ana@henryflix.com', 'Ana')
      model.addSerie('The Office', 9, 'regular', 2005)
      return supertest
        .get('/play/The Big Bang Theory?user=ana@henryflix.com')
        .expect(404)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          expect(res.body).to.deep.eql({ error: 'Serie inexistente' })
        })
    })

    it('GET Si la serie es de categoría "premium" y el usuario no tiene dicho plan, arroja un error', function () {
      model.addUser('ana@henryflix.com', 'Ana')
      model.addSerie('How I Met Your Mother', 9, 'premium', 2005)
      return supertest
        .get('/play/How I Met Your Mother?user=ana@henryflix.com')
        .expect(404)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          expect(res.body).to.deep.eql({ error: 'Contenido no disponible, contrata ahora HenryFlix Premium!' })
        })
    })
  })