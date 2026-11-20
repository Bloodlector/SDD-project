import type { FastifyInstance } from "fastify";
import fastifyCors from "@fastify/cors";
import { authRoutes } from "./modules/auth/routes.js";
import { recordsRoutes } from "./modules/records/routes.js";
import { messagesRoutes } from "./modules/messages/routes.js";
import { stopMessagesConsumer } from "./modules/messages/repository.js";
import { disconnectKafka } from "./lib/kafka.js";

export async function app(server: FastifyInstance): Promise<void> {
  // Enable CORS for frontend
  await server.register(fastifyCors, {
    origin: true,
  });

  server.get("/health", () => ({ status: "ok" }));

  // Register auth routes
  await server.register(authRoutes);

  // Register records routes
  await server.register(recordsRoutes);

  // Register messages routes
  await server.register(messagesRoutes);

  // Cleanup on shutdown
  server.addHook("onClose", async () => {
    await stopMessagesConsumer();
    await disconnectKafka();
  });
}
