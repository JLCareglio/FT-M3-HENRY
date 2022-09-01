function validatePost(personaje) {
  if (!personaje.id || !personaje.name || personaje.name.length < 3)
    return true;
  else return false;
}

function* idGenerator(min) {
  while (true) {
    min++;
    yield min;
  }
}

module.exports = {
  validatePost,
  idGenerator,
};
