const expect = require('chai').expect
const Model = require('../models/model')

describe('---------- `addUser` y `listUsers` ----------', function () {
    beforeEach(function () {
        Model.reset()
      })
      
    it('Inicialmente devuelve un arreglo de usuarios vacío', function () {
      expect(Model.listUsers()).to.eql([])
    })

    it('Agrega usuarios a la lista y devuelve un mensaje de confirmación', function () {
      expect(Model.addUser('martu@henryflix.com', 'Martu')).to.eql('Usuario martu@henryflix.com creado correctamente')
      expect(Model.listUsers()).to.have.length(1)
      expect(Model.addUser('elena@henryflix.com', 'Elena')).to.eql('Usuario elena@henryflix.com creado correctamente')
      expect(Model.listUsers()).to.have.length(2)
    })

    it('Si el email del usuario ya existe, no se agrega a la lista y devuelve un error', function () {
      Model.addUser('martu@henryflix.com', 'Martu')
      expect(Model.listUsers()).to.have.length(1)
      Model.addUser('elena@henryflix.com', 'Elena')
      expect(Model.listUsers()).to.have.length(2)
      expect(() => Model.addUser('elena@henryflix.com', 'Elena')).to.throw('El usuario ya existe')
      expect(Model.listUsers()).to.have.length(2)
    })

    it('Debe tener la propiedad <plan> inicialmente en "regular"', function () {
      Model.addUser('elena@henryflix.com', 'Elena')
      expect(Model.listUsers()[0].plan).to.eql('regular')
    })

    it('En caso de recibir un parámetro, devuelve sólo los usuarios correspondientes al plan indicado', function () {
      Model.addUser('martu@henryflix.com', 'Martu')
      Model.addUser('elena@henryflix.com', 'Elena')
      expect(Model.listUsers('regular')).to.have.length(2)
      expect(Model.listUsers('premium')).to.have.length(0)
    })
  })