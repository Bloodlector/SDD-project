import { describe, it, expect } from "vitest";
import { messageSchema } from "./schemas.js";

describe("messageSchema", () => {
  it("accepts valid message", () => {
    const result = messageSchema.safeParse({
      id: "test-1",
      name: "Test",
      description: "Desc",
    });
    expect(result.success).toBe(true);
  });

  it("accepts message with timestamp", () => {
    const result = messageSchema.safeParse({
      id: "test-1",
      name: "Test",
      description: "Desc",
      timestamp: "2026-01-01T00:00:00Z",
    });
    expect(result.success).toBe(true);
  });

  it("rejects missing id", () => {
    const result = messageSchema.safeParse({
      name: "Test",
      description: "Desc",
    });
    expect(result.success).toBe(false);
  });

  it("rejects empty name", () => {
    const result = messageSchema.safeParse({
      id: "test-1",
      name: "",
      description: "Desc",
    });
    expect(result.success).toBe(false);
  });
});
