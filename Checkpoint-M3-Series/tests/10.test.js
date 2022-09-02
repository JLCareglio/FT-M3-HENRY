const supertest = require('supertest-as-promised')(require('../app'))
const expect = require('chai').expect
const model = require('../models/model')

describe('/series/:category', function () {
    beforeEach(function () {
        model.reset()
      })
    
    it('GET responde con las series de la categoría indicada', function () {
      model.addSerie('The Office', 9, 'regular', 2005)
      model.addSerie('How I Met Your Mother', 9, 'premium', 2005)
      model.addSerie('The Big Bang Theory', 12, 'regular', 2007)
      return supertest
        .get('/series/premium')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          expect(res.body).to.deep.eql([{ category: 'premium', name: 'How I Met Your Mother', rating: 0, seasons: 9, year: 2005, reviews: [] }])
          expect(model.listSeries()).to.have.length(3)
        })
    })

    it('GET si la categoría indicada no existe, responde con un error', function () {
      return supertest
        .get('/series/platinum')
        .expect(404)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          expect(res.body).to.deep.eql({ error: 'La categoría platinum no existe' })
        })
    })
  })