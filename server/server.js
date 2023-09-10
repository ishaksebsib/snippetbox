const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

//
const app = express();
const server = http.createServer(app);
const port = 8000;

// creating new socket.io server
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");

  // listen if chat message is appiers
  socket.on("chat message", (msg) => {
    console.log("message: " + msg); // log the message we recived from users
    io.emit("chat message", msg); // send back / Brodcast the message for all connected users
  });

  // log if socket disconnected
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});
