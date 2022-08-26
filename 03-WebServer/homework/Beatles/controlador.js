const fs = require("fs");

const beatles = [
  {
    name: "John Lennon",
    birthdate: "09/10/1940",
    profilePic:
      "https://blogs.correiobraziliense.com.br/trilhasonora/wp-content/uploads/sites/39/2020/10/CBNFOT081020100047-550x549.jpg",
  },
  {
    name: "Paul McCartney",
    birthdate: "18/06/1942",
    profilePic:
      "http://gazettereview.com/wp-content/uploads/2016/06/paul-mccartney.jpg",
  },
  {
    name: "George Harrison",
    birthdate: "25/02/1946",
    profilePic:
      "https://canaldosbeatles.files.wordpress.com/2012/02/george-george-harrison-8321345-438-600.jpg",
  },
  {
    name: "Richard Starkey",
    birthdate: "07/08/1940",
    profilePic:
      "http://cp91279.biography.com/BIO_Bio-Shorts_0_Ringo-Starr_SF_HD_768x432-16x9.jpg",
  },
];

const showHome = (req, res) => {
  const html = fs.readFileSync("./index.html");
  res.writeHead(200), { "Content-Type": "text/html" };
  res.end(html);
};
const getBeatles = (req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(beatles));
};
const getBeatle = (req, res) => {
  let btleUrl = req.url.split("/")[2].replaceAll("%20", " ").toLowerCase();
  let beatle = beatles.find((btle) => btle.name.toLowerCase() === btleUrl);
  if (beatle) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(beatle));
  } else showError404(res);
};
const showBeatle = (req, res) => {
  let btleUrl = req.url
    .split("/")
    .join("")
    .split("%20")
    .join(" ")
    .toLowerCase();
  let htmlPerfil = fs.readFileSync("./beatle.html", "utf-8");
  let beatle = beatles.find((btle) => btle.name.toLowerCase() === btleUrl);
  if (beatle) {
    htmlPerfil = htmlPerfil
      .replace("{nombre}", beatle.name)
      .replace("{fecha}", beatle.birthdate)
      .replace("{img}", beatle.profilePic);

    res.writeHead(200);
    res.end(htmlPerfil);
  } else showError404(res);
};

const showError404 = (res) => {
  let htmlError = fs.readFileSync("./404.html");
  res.writeHead(404);
  res.end(htmlError);
};

module.exports = {
  showHome,
  getBeatles,
  getBeatle,
  showBeatle,
  showError404,
};
