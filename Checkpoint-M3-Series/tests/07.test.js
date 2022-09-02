const supertest = require('supertest-as-promised')(require('../app'))
const expect = require('chai').expect
const model = require('../models/model')


describe('/users', function () {
      beforeEach(function () {
          model.reset()
        })
    it('GET inicialmente responde con un array vacío', function () {
      return supertest // supertest nos permite hacer y testear requests HTTP
        .get('/users') // hacemos un request HTTP: GET a '/users'
        .expect(200) // el codigo de status del response
        .expect('Content-Type', /json/) // podemos testear los headers
        .expect(function (res) {
          expect(res.body).to.eql([]) // testeamos la respuesta con el body
        })
    })

    it('GET responde con un array con todos los usuarios', function () {
      model.addUser('martu@henryflix.com', 'Martu')
      model.addUser('elena@henryflix.com', 'Elena')
      return supertest
        .get('/users')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          expect(res.body).to.eql([
            {
              email: 'martu@henryflix.com',
              name: 'Martu',
              plan: 'regular',
              watched: []
            },
            {
              email: 'elena@henryflix.com',
              name: 'Elena',
              plan: 'regular',
              watched: []
            }
          ])
        })
    })

    it('POST agrega un nuevo usuario, responde con un mensaje de confirmación y su status correspondiente', function () {
      return supertest
        .post('/users')
        .send({ email: 'martu@henryflix.com', name: 'Martu' })
        .expect(201)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          expect(res.body).to.eql({ msg: 'Usuario martu@henryflix.com creado correctamente' })
          expect(model.listUsers()).to.have.length(1)
          expect(model.listUsers()[0]).to.eql({ email: 'martu@henryflix.com', name: 'Martu', plan: 'regular', watched: [] })
        })
    })

    it('POST si el usuario ya existe, responde con un error con su status correspondiente', function () {
      model.addUser('martu@henryflix.com', 'Martu')
      return supertest
        .post('/users')
        .send({ email: 'martu@henryflix.com', name: 'Martu' })
        .expect(400)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          expect(res.body).to.eql({ error: 'El usuario ya existe' })
          expect(model.listUsers()).to.have.length(1)
        })
    })
  })