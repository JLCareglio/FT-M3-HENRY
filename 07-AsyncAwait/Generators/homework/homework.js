function* fizzBuzzGenerator(max = 0) {
  // Tu código acá:
  let num = 1;
  while (num <= max || max === 0) {
    if (!(num % 3) && !(num % 5)) yield "Fizz Buzz";
    else if (!(num % 3)) yield "Fizz";
    else if (!(num % 5)) yield "Buzz";
    else yield num;
    num++;
  }
}

module.exports = fizzBuzzGenerator;
