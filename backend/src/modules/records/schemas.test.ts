import { describe, it, expect } from "vitest";
import { createRecordSchema, RECORD_NAME_MAX, RECORD_DESCRIPTION_MAX } from "./schemas.js";

describe("createRecordSchema", () => {
  it("accepts valid input", () => {
    const result = createRecordSchema.safeParse({
      id: "test-id",
      name: "Test",
      description: "Description",
    });
    expect(result.success).toBe(true);
  });

  it("rejects empty name", () => {
    const result = createRecordSchema.safeParse({
      id: "test-id",
      name: "",
      description: "Description",
    });
    expect(result.success).toBe(false);
  });

  it("rejects whitespace-only name", () => {
    const result = createRecordSchema.safeParse({
      id: "test-id",
      name: "   ",
      description: "Description",
    });
    expect(result.success).toBe(false);
  });

  it("rejects name exceeding max length", () => {
    const result = createRecordSchema.safeParse({
      id: "test-id",
      name: "a".repeat(RECORD_NAME_MAX + 1),
      description: "Description",
    });
    expect(result.success).toBe(false);
  });

  it("rejects description exceeding max length", () => {
    const result = createRecordSchema.safeParse({
      id: "test-id",
      name: "Test",
      description: "a".repeat(RECORD_DESCRIPTION_MAX + 1),
    });
    expect(result.success).toBe(false);
  });

  it("trims name whitespace", () => {
    const result = createRecordSchema.safeParse({
      id: "test-id",
      name: "  Test  ",
      description: "Description",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe("Test");
    }
  });
});
