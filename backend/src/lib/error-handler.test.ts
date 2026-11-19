import { describe, it, expect, vi } from "vitest";
import { errorHandler } from "./error-handler.js";
import { AppError, ServiceUnavailableError } from "./errors.js";

function mockReply() {
  const statusMock = vi.fn().mockReturnValue({ send: vi.fn() });
  const reply = { status: statusMock } as any;
  return { reply, statusMock };
}

describe("errorHandler", () => {
  it("handles AppError with structured response", () => {
    const { reply, statusMock } = mockReply();
    const err = new AppError(404, "not_found", "Not found");
    errorHandler(err, {} as any, reply);

    expect(statusMock).toHaveBeenCalledWith(404);
    expect(reply.status).toHaveBeenCalledWith(404);
  });

  it("handles ServiceUnavailableError with 503", () => {
    const { reply, statusMock } = mockReply();
    const err = new ServiceUnavailableError("test reason");
    errorHandler(err, {} as any, reply);

    expect(statusMock).toHaveBeenCalledWith(503);
  });

  it("handles Fastify 4xx errors as bad_request", () => {
    const { reply, statusMock } = mockReply();
    const err = { statusCode: 413, message: "Payload too large" } as any;
    errorHandler(err, {} as any, reply);

    expect(statusMock).toHaveBeenCalledWith(413);
  });

  it("handles unexpected errors as internal", () => {
    const { reply, statusMock } = mockReply();
    const err = new Error("Unknown error");
    errorHandler(err, {} as any, reply);

    expect(statusMock).toHaveBeenCalledWith(500);
  });
});
