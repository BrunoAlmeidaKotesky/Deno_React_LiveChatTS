import { listenAndServe } from "https://deno.land/std/http/server.ts";
import { acceptWebSocket, acceptable } from "https://deno.land/std/ws/mod.ts";
import Chat from "./models/chat.ts";

listenAndServe({ port: 3001 }, async (req) => {
  if (req.method === "GET" && req.url === "/ws") {
    if (acceptable(req)) {
      const accept = await acceptWebSocket({
        conn: req.conn,
        bufReader: req.r,
        bufWriter: req.w,
        headers: req.headers,
      });
      let runChat = new Chat();
      runChat.chat(accept);
    }
  }
});
console.log("Server started on port 3001");