import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { login, register } from "./auth.js";

describe("auth API", () => {
  beforeEach(() => {
    vi.spyOn(globalThis, "fetch").mockImplementation(
      () =>
        Promise.resolve({
          ok: false,
          json: () => Promise.resolve({ message: "Server error" }),
        } as Response)
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("login", () => {
    it("returns error message on non-ok response", async () => {
      const result = await login("test", "test");
      expect("error" in result).toBe(true);
      if ("error" in result) {
        expect(result.error).toBe("Server error");
      }
    });
  });

  describe("register", () => {
    it("returns error message on non-ok response", async () => {
      const result = await register("testuser", "password123");
      expect("error" in result).toBe(true);
      if ("error" in result) {
        expect(result.error).toBe("Server error");
      }
    });
  });
});
