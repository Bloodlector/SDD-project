import { describe, expect, it, vi } from "vitest";
import { register, login } from "./service.js";
import * as repository from "./repository.js";

const mockUser = {
  id: "test-id",
  username: "testuser",
  password: "password123",
  createdAt: new Date(),
  updatedAt: new Date(),
};

vi.mock("./repository.js", () => ({
  findUserByUsername: vi.fn(),
  createUser: vi.fn(),
}));

describe("auth service", () => {
  describe("register", () => {
    it("creates user when username is unique", async () => {
      vi.mocked(repository.findUserByUsername).mockResolvedValue(null);
      vi.mocked(repository.createUser).mockResolvedValue(mockUser);

      const result = await register("testuser", "password123");

      expect(result).toEqual({ id: "test-id", username: "testuser" });
      expect(repository.createUser).toHaveBeenCalledWith("testuser", "password123");
    });

    it("throws ConflictError when username exists", async () => {
      vi.mocked(repository.findUserByUsername).mockResolvedValue(mockUser);

      await expect(register("testuser", "password123")).rejects.toThrow(
        "Пользователь с таким именем уже существует"
      );
      expect(repository.createUser).not.toHaveBeenCalled();
    });
  });

  describe("login", () => {
    it("returns user dto on valid credentials", async () => {
      vi.mocked(repository.findUserByUsername).mockResolvedValue(mockUser);

      const result = await login("testuser", "password123");

      expect(result).toEqual({ id: "test-id", username: "testuser" });
    });

    it("throws UnauthorizedError when user not found", async () => {
      vi.mocked(repository.findUserByUsername).mockResolvedValue(null);

      await expect(login("unknown", "password")).rejects.toThrow(
        "Пользователь не найден"
      );
    });

    it("throws UnauthorizedError on wrong password", async () => {
      vi.mocked(repository.findUserByUsername).mockResolvedValue(mockUser);

      await expect(login("testuser", "wrongpassword")).rejects.toThrow(
        "Неверный пароль"
      );
    });
  });
});
