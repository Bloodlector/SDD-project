import Fastify from "fastify";
import { app } from "./app.js";
import { AppError } from "./lib/errors.js";

const server = Fastify({ logger: true });

server.setErrorHandler((err: unknown, _req, reply) => {
  if (err instanceof AppError) {
    return reply
      .status(err.statusCode)
      .send({ code: err.code, message: err.message });
  }
  server.log.error(err);
  return reply
    .status(500)
    .send({ code: "internal", message: "Internal error" });
});

await server.register(app);
await server.listen({
  port: Number(process.env.PORT ?? 3000),
  host: "0.0.0.0",
});
