const http = require("http");
const argv = require("minimist")(process.argv.slice(2));
const db = require("./db");

function findUser(req, res) {
  // Simulated weakness: request input concatenated into SQL text.
  const id = req.query.id;
  const sql = "SELECT * FROM users WHERE id = " + id;
  db.query(sql, (err, rows) => {
    res.end(JSON.stringify(rows));
  });
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, "http://localhost");
  req.query = Object.fromEntries(url.searchParams);
  if (url.pathname === "/user") return findUser(req, res);
  res.end("qa fixture");
});

if (require.main === module) server.listen(argv.port || 3000);
module.exports = { findUser };
