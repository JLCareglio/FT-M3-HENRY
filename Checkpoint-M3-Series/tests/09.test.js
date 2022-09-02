const supertest = require('supertest-as-promised')(require('../app'))
const expect = require('chai').expect
const model = require('../models/model')

  describe('/series', function () {
    beforeEach(function () {
        model.reset()
      })
      
    it('GET inicialmente responde con un array vacío', function () {
      return supertest
        .get('/series')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          expect(res.body).to.eql([])
        })
    })

    it('GET responde con un array de todas las series', function () {
      model.addSerie('The Office', 9, 'regular', 2005)
      model.addSerie('How I Met Your Mother', 9, 'premium', 2005)
      model.addSerie('The Big Bang Theory', 12, 'regular', 2007)
      return supertest
        .get('/series')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          expect(res.body).to.deep.eql([
            {
              category: 'regular',
              name: 'The Office',
              rating: 0,
              seasons: 9,
              year: 2005,
              reviews: []
            },
            {
              category: 'premium',
              name: 'How I Met Your Mother',
              rating: 0,
              seasons: 9,
              year: 2005,
              reviews: []
            },
            {
              category: 'regular',
              name: 'The Big Bang Theory',
              rating: 0,
              seasons: 12,
              year: 2007,
              reviews: []
            }
          ])
        })
    })

    it('POST agrega una nueva serie y responde con un mensaje de confirmación', function () {
      return supertest
        .post('/series')
        .send({
          name: 'The Office',
          seasons: 9,
          category: 'regular',
          year: 2005
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          expect(res.body).to.eql({ msg: 'La serie The Office fue agregada correctamente' })
          expect(model.listSeries()).to.have.length(1)
          expect(model.listSeries()[0].name).to.eql('The Office')
        })
    })

    it('POST Si la serie ya existe, no la agrega y responde con un error', function () {
      model.addSerie('The Office', 9, 'regular', 2005)
      return supertest
        .post('/series')
        .send({
          name: 'The Office',
          seasons: 9,
          category: 'regular',
          year: 2005
        })
        .expect(400)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          expect(res.body).to.deep.eql({ error: 'La serie The Office ya existe' })
          expect(model.listSeries()).to.have.length(1)
        })
    })

    it('POST Si la categoría de la serie no existe, no la agrega y responde con un error', function () {
      return supertest
        .post('/series')
        .send({
          name: 'The Office',
          seasons: 9,
          category: 'gold',
          year: 2005
        })
        .expect(400)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          expect(res.body).to.deep.eql({ error: 'La categoría gold no existe' })
          expect(model.listSeries()).to.have.length(0)
        })
    })
  })