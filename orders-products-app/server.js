const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const { Server } = require("socket.io");

const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 3000;

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  const io = new Server(server);

  const broadcastSessions = () => {
    const count = io.engine.clientsCount;
    io.emit("sessions", count);
  };

  io.on("connection", (socket) => {
    socket.emit("sessions", io.engine.clientsCount);
    broadcastSessions();
    socket.on("get_sessions", () => {
      socket.emit("sessions", io.engine.clientsCount);
    });
    socket.on("disconnect", () => {
      broadcastSessions();
    });
  });

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
