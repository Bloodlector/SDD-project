import type { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { AppError } from "./errors.js";
import { ServiceUnavailableError } from "./errors.js";

// Import Zod v4 types — in Zod v4 the ValidationError is on z
import { z } from "zod";

export function errorHandler(
  error: FastifyError,
  _request: FastifyRequest,
  reply: FastifyReply,
): void {
  // AppError (including ServiceUnavailableError) — structured response
  if (error instanceof AppError) {
    return reply
      .status(error.statusCode)
      .send({ code: error.code, message: error.message });
  }

  // Zod v4 validation error
  if (error.code === "ZOD_V4_ERROR" || error.statusCode === 400) {
    // Check if it's a Zod validation error by looking at the error message or properties
    // Zod v4 errors have a specific structure
    const zodError = error as z.ZodError;
    if (zodError || error.message?.includes("expected")) {
      return reply.status(400).send({
        code: "validation_error",
        message: "Ошибка валидации",
      });
    }
  }

  // Fastify 4xx errors (including 413 Payload Too Large)
  if (error.statusCode >= 400 && error.statusCode < 500) {
    return reply.status(error.statusCode).send({
      code: "bad_request",
      message: "Некорректный запрос",
    });
  }

  // Fallback: unexpected error
  console.error(error);
  return reply.status(500).send({
    code: "internal",
    message: "Internal error",
  });
}
