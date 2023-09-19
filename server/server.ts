import express, { Express, Request, Response } from "express";
import http from "http";
import { Server } from "socket.io";

//
const app: Express = express();
const server = http.createServer(app);
const port = 8000;

// creating new socket.io server
const io = new Server(server);

app.get("/", (req: Request, res: Response) => {
  res.sendFile(process.cwd() + "/index.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");

  // listen if chat message is appiers
  socket.on("chat message", (msg: string) => {
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
