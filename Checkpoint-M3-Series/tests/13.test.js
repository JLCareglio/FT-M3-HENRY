const supertest = require('supertest-as-promised')(require('../app'))
const expect = require('chai').expect
const model = require('../models/model')
describe('/rating/:serie', function () {
    beforeEach(function () {
        model.reset()
      })
    it('POST Guarda el puntaje en la serie y responde con mensaje de confirmación', function () {
      model.addSerie('Seinfeld', 9, 'regular', 1989)
      model.addUser('martu@henryflix.com', 'Martu')
      model.addUser('mora@henryflix.com', 'Mora')
      model.addUser('wan@henryflix.com', 'Wanda')
      model.play('Seinfeld', 'martu@henryflix.com')
      model.play('Seinfeld', 'mora@henryflix.com')
      model.play('Seinfeld', 'wan@henryflix.com')
      model.rateSerie('Seinfeld', 'martu@henryflix.com', 4)
      model.rateSerie('Seinfeld', 'mora@henryflix.com', 3)
      return supertest
        .post('/rating/Seinfeld')
        .send({
          email: 'wan@henryflix.com',
          score: 5
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          expect(res.body).to.deep.eql({ msg: 'Le has dado 5 puntos a la serie Seinfeld' })
          expect(model.listSeries()[0].reviews).to.have.length(3)
          expect(model.listSeries()[0].rating).to.eql(4)
        })
    })

    it('POST Si el usuario no existe, responde con un error y no guarda el puntaje', function () {
      model.addSerie('Seinfeld', 9, 'regular', 1989)
      return supertest
        .post('/rating/Seinfeld')
        .send({
          email: 'wan@henryflix.com',
          score: 5
        })
        .expect(404)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          expect(res.body).to.deep.eql({ error: 'Usuario inexistente' })
          expect(model.listSeries()[0].reviews).to.have.length(0)
          expect(model.listSeries()[0].rating).to.eql(0)
        })
    })

    it('POST Si la serie no existe, responde con un error y no guarda el puntaje', function () {
      model.addUser('wan@henryflix.com', 'Wanda')
      return supertest
        .post('/rating/Stranger Things')
        .send({
          email: 'wan@henryflix.com',
          score: 5
        })
        .expect(404)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          expect(res.body).to.deep.eql({ error: 'Serie inexistente' })
        })
    })

    it('POST Si el puntaje es inválido, responde con un error y no lo guarda', function () {
      model.addSerie('Seinfeld', 9, 'regular', 1989)
      model.addUser('wan@henryflix.com', 'Wanda')
      return supertest
        .post('/rating/Seinfeld')
        .send({
          email: 'wan@henryflix.com',
          score: 7
        })
        .expect(404)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          expect(res.body).to.deep.eql({ error: 'Puntaje inválido' })
          expect(model.listSeries()[0].reviews).to.have.length(0)
          expect(model.listSeries()[0].rating).to.eql(0)
        })
    })

    it('POST Si el usuario no reprodujo la serie, responde con un error y no guarda el puntaje', function () {
      model.addSerie('Seinfeld', 9, 'regular', 1989)
      model.addUser('wan@henryflix.com', 'Wanda')
      return supertest
        .post('/rating/Seinfeld')
        .send({
          email: 'wan@henryflix.com',
          score: 5
        })
        .expect(404)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          expect(res.body).to.deep.eql({ error: 'Debes reproducir el contenido para poder puntuarlo' })
          expect(model.listSeries()[0].reviews).to.have.length(0)
          expect(model.listSeries()[0].rating).to.eql(0)
        })
    })
  })