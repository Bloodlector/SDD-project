import { describe, it, expect, vi } from "vitest";
import { errorHandler } from "./error-handler.js";
import { AppError, ServiceUnavailableError } from "./errors.js";
import type { FastifyReply, FastifyRequest, FastifyError } from "fastify";

function mockReply() {
  const sendMock = vi.fn().mockReturnThis();
  const statusMock = vi.fn().mockReturnValue({ send: sendMock });
  const reply = { status: statusMock, send: sendMock } as unknown as FastifyReply;
  return { reply, statusMock, sendMock };
}

describe("errorHandler", () => {
  it("handles AppError with structured response", () => {
    const { reply, statusMock } = mockReply();
    const err = new AppError(404, "not_found", "Not found");
    errorHandler(err, {} as FastifyRequest, reply);

    expect(statusMock).toHaveBeenCalledWith(404);
  });

  it("handles ServiceUnavailableError with 503", () => {
    const { reply, statusMock } = mockReply();
    const err = new ServiceUnavailableError("test reason");
    errorHandler(err, {} as FastifyRequest, reply);

    expect(statusMock).toHaveBeenCalledWith(503);
  });

  it("handles Fastify 4xx errors as bad_request", () => {
    const { reply, statusMock } = mockReply();
    const err = {
      statusCode: 413,
      message: "Payload too large",
      code: "test",
      name: "TestError",
    } satisfies FastifyError;
    errorHandler(err, {} as FastifyRequest, reply);

    expect(statusMock).toHaveBeenCalledWith(413);
  });

  it("handles unexpected errors as internal", () => {
    const { reply, statusMock } = mockReply();
    const err = Object.assign(new Error("Unknown error"), {
      statusCode: 500,
      code: "internal",
      name: "Error",
    }) satisfies FastifyError;
    errorHandler(err, {} as FastifyRequest, reply);

    expect(statusMock).toHaveBeenCalledWith(500);
  });
});
