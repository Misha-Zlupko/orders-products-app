const http = require("http");
const { Server } = require("socket.io");

const port = process.env.PORT || 3001;

const server = http.createServer((_req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Socket.io server for sessions count");
});

const allowedOrigins = process.env.ALLOWED_ORIGINS || "*";
const io = new Server(server, {
  cors: {
    origin: allowedOrigins === "*" ? "*" : allowedOrigins.split(",").map((o) => o.trim()),
    methods: ["GET", "POST"],
  },
});

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
  console.log(`Socket server listening on port ${port}`);
});
