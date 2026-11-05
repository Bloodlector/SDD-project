import type { FastifyInstance } from "fastify";
import fastifyCors from "@fastify/cors";
import { authRoutes } from "./modules/auth/routes.js";

export async function app(server: FastifyInstance): Promise<void> {
  // Enable CORS for frontend
  await server.register(fastifyCors, {
    origin: true,
  });

  server.get("/health", () => ({ status: "ok" }));
  
  // Register auth routes
  await server.register(authRoutes);
}
