import { describe, expect, it } from "vitest";
import { registerSchema, loginSchema } from "./schemas.js";

describe("auth schemas", () => {
  describe("registerSchema", () => {
    it("accepts valid data", () => {
      const result = registerSchema.safeParse({
        username: "abc",
        password: "123456",
      });
      expect(result.success).toBe(true);
    });

    it("rejects username shorter than 3 chars", () => {
      const result = registerSchema.safeParse({
        username: "ab",
        password: "123456",
      });
      expect(result.success).toBe(false);
    });

    it("rejects password shorter than 6 chars", () => {
      const result = registerSchema.safeParse({
        username: "abc",
        password: "12345",
      });
      expect(result.success).toBe(false);
    });

    it("rejects missing fields", () => {
      const result = registerSchema.safeParse({ username: "abc" });
      expect(result.success).toBe(false);
    });
  });

  describe("loginSchema", () => {
    it("accepts valid data", () => {
      const result = loginSchema.safeParse({
        username: "user",
        password: "pass",
      });
      expect(result.success).toBe(true);
    });

    it("rejects empty username", () => {
      const result = loginSchema.safeParse({
        username: "",
        password: "pass",
      });
      expect(result.success).toBe(false);
    });

    it("rejects empty password", () => {
      const result = loginSchema.safeParse({
        username: "user",
        password: "",
      });
      expect(result.success).toBe(false);
    });
  });
});
