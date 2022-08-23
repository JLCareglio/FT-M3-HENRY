const commands = require("./commands");

process.stdout.write("prompt > "); // First output un prompt

// El evento stdin 'data' se dispara cuando el user escribe una línea
process.stdin.on("data", (data) => {
  let [cmd, ...datos] = data.toString().trim().split(" "); // remueve la nueva línea (\n) y separa strings x cada espacio
  commands[cmd] ? commands[cmd](datos) : commands.done("Comando no encontrado");
});
