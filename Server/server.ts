import { listenAndServe } from "https://deno.land/std/http/server.ts";
import { acceptWebSocket, acceptable } from "https://deno.land/std/ws/mod.ts";
import Chat from "./models/chat.ts";
import Rooms from './models/rooms.ts';

listenAndServe({ port: 3001 }, async (req) => {
  if (req.method === "GET" && req.url === "/ws") {
    if (acceptable(req)) {
      const chat = new Chat();
      const rooms = new Rooms();
      const accepted = await acceptWebSocket({
        conn: req.conn,
        bufReader: req.r,
        bufWriter: req.w,
        headers: req.headers,
      });
      chat.chat(accepted);
      
    }
  }
});
console.log("Server started on port 3001");