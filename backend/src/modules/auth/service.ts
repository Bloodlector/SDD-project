import { findUserByUsername, createUser } from "./repository.js";
import type { UserRecord } from "./repository.js";
import { ConflictError, UnauthorizedError } from "../../lib/errors.js";

export interface UserDto {
  id: string;
  username: string;
}

function toDto(user: UserRecord): UserDto {
  return { id: user.id, username: user.username };
}

export async function register(username: string, password: string): Promise<UserDto> {
  const existing = await findUserByUsername(username);

  if (existing) {
    throw new ConflictError("Пользователь с таким именем уже существует");
  }

  const user = await createUser(username, password);
  return toDto(user);
}

export async function login(username: string, password: string): Promise<UserDto> {
  const user = await findUserByUsername(username);

  if (!user) {
    throw new UnauthorizedError("Пользователь не найден");
  }

  if (user.password !== password) {
    throw new UnauthorizedError("Неверный пароль");
  }

  return toDto(user);
}
