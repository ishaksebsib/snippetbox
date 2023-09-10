const express = require("express");
const http = require("http");

//
const app = express();
const server = http.createServer(app);
const port = 8000;

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});
