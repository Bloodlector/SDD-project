import type { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { AppError } from "./errors.js";

export function errorHandler(
  error: FastifyError,
  _request: FastifyRequest,
  reply: FastifyReply,
): void {
  // AppError (including ServiceUnavailableError) — structured response
  if (error instanceof AppError) {
    reply
      .status(error.statusCode)
      .send({ code: error.code, message: error.message });
    return;
  }

  // Fastify 4xx errors (including 413 Payload Too Large)
  if (error.statusCode != null && error.statusCode >= 400 && error.statusCode < 500) {
    reply.status(error.statusCode).send({
      code: "bad_request",
      message: "Некорректный запрос",
    });
    return;
  }

  // Fallback: unexpected error
  console.error(error);
  reply.status(500).send({
    code: "internal",
    message: "Internal error",
  });
}
