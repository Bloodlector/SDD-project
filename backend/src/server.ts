import Fastify from "fastify";
import { app } from "./app.js";
import { errorHandler } from "./lib/error-handler.js";

const server = Fastify({ logger: true, bodyLimit: 16384 });

server.setErrorHandler(errorHandler);

await server.register(app);
await server.listen({
  port: Number(process.env.PORT ?? 3000),
  host: "0.0.0.0",
});
