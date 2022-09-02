function sumArray(array, num) {
  if (!Array.isArray(array) || array.length < 1 || typeof num !== "number") return false;

  for (let i = 0; i < array.length; i++) {
    for (let x = i + 1; x < array.length; x++) {
      if (array[i] + array[x] === num) return true;
    }
  }
  return false;
}

module.exports = {
  sumArray,
};
