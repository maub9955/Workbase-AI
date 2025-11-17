import { WebSocketServer } from "ws";

const port = Number(process.env.REALTIME_PORT ?? 4100);

const wss = new WebSocketServer({ port });

wss.on("connection", (socket) => {
  socket.send(JSON.stringify({ type: "welcome", message: "Realtime service ready" }));
});

console.log(`Realtime server listening on ws://localhost:${port}`);
