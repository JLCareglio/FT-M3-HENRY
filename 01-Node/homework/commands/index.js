const fs = require("fs");
const request = require("request");

const done = (input) => process.stdout.write(`${input}\n\nprompt > `);

const pwd = () => done(process.mainModule.path);
const date = () => done(Date());
const ls = () => {
  fs.readdir(".", (err, files) => {
    if (err) throw err;
    done(files.join("\n"));
  });
};
const echo = (input) => done(input.join(" "));
const cat = (input) => {
  fs.readFile(input[0], (err, data) => {
    if (err) throw err;
    done(data);
  });
};
const head = (input) => {
  fs.readFile(input[0], "utf-8", (err, data) => {
    if (err) throw err;
    const cantidad = Number(input[1]) ? Number(input[1]) : 10;
    let lineas = data.toString().split("\n").splice(0, cantidad).join("\n");
    done(lineas);
  });
};
const tail = (input) => {
  fs.readFile(input[0], "utf-8", (err, data) => {
    if (err) throw err;
    const cantidad = Number(input[1]) ? Number(input[1]) : 10;
    let lineas = data.toString().split("\n").slice(-cantidad).join("\n");
    done(lineas);
  });
};
const curl = (input) => {
  request(input[0], function (err, response, body) {
    if (err) throw err;
    if (response.statusCode === "200") console.log("llego un 200");
    done(body);
  });
};
const sort = () => {};
const wc = () => {};
const uniq = () => {};
const clear = () => process.stdout.write(`${"\033c"}prompt > `);
// const clear = () => {
//   console.clear();
//   process.stdout.write(`prompt > `);
// };

module.exports = {
  done,
  pwd,
  date,
  ls,
  echo,
  cat,
  head,
  tail,
  curl,
  sort,
  wc,
  uniq,
  clear,
};
