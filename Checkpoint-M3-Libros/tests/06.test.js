/// ========================================================================== ///
/// ============================= HENRY-COMMERCE ============================= ///
/// ================================== TESTS ================================= ///

const utils = require('../utils')
const classifyBooks = require('../controllers/06-controller')
const expect = require('chai').expect;

describe('---------- `classifyBooks` ----------', function () {
  beforeEach(function () {
    utils.reset()
  })

it('Devuelve un objeto con los libros clasificados por género', function () {
  const book1  = utils.generateBook();
  const book4 = utils.generateBook();
  const book5 = utils.generateBook();
  const book11 = utils.generateBook();
  utils.books.push(book1);
  utils.books.push(book4);
  utils.books.push(book5);
  utils.books.push(book11);
  book5.genre = 'History';
  book1.genre = 'Fantasy';
  book11.genre = 'Horror';
  book4.genre = book1.genre;
  expect(classifyBooks()).to.eql({
      [book1.genre]: [
        utils.testBooks()[0],
        utils.testBooks()[1]
      ],
      [book5.genre]: [
        utils.testBooks()[2]
      ],
      [book11.genre]: [
        utils.testBooks()[3]
      ]
    });
    const book9 = utils.generateBook();
    const book10 = utils.generateBook();
    const book3 = utils.generateBook();
    book3.genre = book1.genre;
    book9.genre = book11.genre;
    book10.genre = book11.genre;
    utils.books.push(book9);
    utils.books.push(book10);
    utils.books.push(book3);
    // Modificamos los libros para evitar hardcodeos
    expect(classifyBooks()).to.eql({
      [book1.genre]: [
        utils.testBooks()[0],
        utils.testBooks()[1],
        utils.testBooks()[6],
      ],
      [book5.genre]: [
        utils.testBooks()[2]
      ],
      [book11.genre]: [
        utils.testBooks()[3],
        utils.testBooks()[4],
        utils.testBooks()[5]
      ]
    });
    book5.genre = 'Suspense';
    expect(classifyBooks()).to.eql({
      [book1.genre]: [
        utils.testBooks()[0],
        utils.testBooks()[1],
        utils.testBooks()[6],
      ],
      [book5.genre]: [
        utils.testBooks()[2]
      ],
      [book11.genre]: [
        utils.testBooks()[3],
        utils.testBooks()[4],
        utils.testBooks()[5]
      ]
    });
  });
  it('Deberia arrojar un error si no hay libros para clasificar', () => {
    expect(() => classifyBooks()).to.throw('No hay libros disponibles');
  });
});
