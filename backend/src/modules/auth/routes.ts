import type { FastifyInstance } from "fastify";
import { registerSchema, loginSchema } from "./schemas.js";
import { register, login } from "./service.js";

export async function authRoutes(server: FastifyInstance) {
  server.post("/api/auth/register", async (request, reply) => {
    const body = registerSchema.parse(request.body);
    const user = await register(body.username, body.password);
    return reply.status(201).send({ message: "Регистрация успешна", user });
  });

  server.post("/api/auth/login", async (request, reply) => {
    const body = loginSchema.parse(request.body);
    const user = await login(body.username, body.password);
    return reply.send({ message: "Авторизация успешна", user });
  });
}
