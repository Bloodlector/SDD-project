import type { FastifyInstance } from "fastify";
import { getMessages } from "./service.js";
import { startMessagesConsumer } from "./repository.js";

export function messagesRoutes(server: FastifyInstance) {
  let consumerStarted = false;

  server.get("/api/messages", async (_request, reply) => {
    if (!consumerStarted) {
      consumerStarted = true;
      try {
        await startMessagesConsumer();
      } catch {
        // consumer start failed, continue with empty buffer
      }
    }

    const messages = getMessages();
    return reply.send(messages);
  });

  // SSE endpoint for real-time updates
  server.get("/api/messages/stream", async (_request, reply) => {
    if (!consumerStarted) {
      consumerStarted = true;
      try {
        await startMessagesConsumer();
      } catch {
        // consumer start failed
      }
    }

    const res = reply.raw;
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "Access-Control-Allow-Origin": "*",
    });
    res.write(`data: ${JSON.stringify(getMessages())}\n\n`);

    // Send periodic updates
    const interval = setInterval(() => {
      try {
        res.write(`data: ${JSON.stringify(getMessages())}\n\n`);
      } catch {
        clearInterval(interval);
      }
    }, 2000);

    // Cleanup on response finish
    res.on("close", () => {
      clearInterval(interval);
    });
  });
}
