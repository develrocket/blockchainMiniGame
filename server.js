const express = require("express");
const http = require("http");
const fs = require("fs");
const crypto = require("crypto");
const app = express();
const server = http.createServer(app);
const WebSocket = require("ws");
const socketServer = new WebSocket.Server({ port: 3000 });

app.use(express.static("public"));

let hash = ["48c084d0ff475215956bee4c6749cf466527dc2a5e4b28309128c84e94c49519"];
let interval = 0;

const minedClient = [0];
const minedHash = [];

function generateRandomHash() {
  const data = Math.random().toString();
  const hash = crypto.createHash("sha256").update(data).digest("hex");
  return hash;
}

function checkIfDone(target, mined) {
  if (mined.startsWith("0000")) {
    minedHash.push(target, mined);
    console.log(
      "@ " +
        minedHash[minedHash.length - 2] +
        " " +
        minedHash[minedHash.length - 1]
    );
    newHash = generateRandomHash();
    hash.push(newHash);
    hash.shift();
    interval = 0;
  } else {
    console.log(target, mined);
    interval += 10000;
    minedClient.push(interval);
  }
}

socketServer.on("connection", (ws) => {
  // Send the message back to the client
  const data = [interval, hash[0]];
  ws.send(JSON.stringify(data));

  ws.on("message", (message) => {
    const dataFromClient = JSON.parse(message);

    checkIfDone(dataFromClient[0], dataFromClient[1]);
  });
});

app.use(express.json());

app.get("/", (req, res) => {
  fs.readFile("index.html", (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end(`Error loading index.html: ${err}`);
    } else {
      const currentHash = hash[0];
      const html = `${data}`;
      res.send(html);
    }
  });
});

server.listen(8080, () => {
  console.log("Server started on port 8080");
});
