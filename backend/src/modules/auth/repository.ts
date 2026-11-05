import { prisma } from "../../lib/prisma.js";

export interface UserRecord {
  id: string;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export async function findUserByUsername(username: string): Promise<UserRecord | null> {
  return prisma.user.findUnique({
    where: { username },
  });
}

export async function createUser(username: string, password: string): Promise<UserRecord> {
  return prisma.user.create({
    data: { username, password },
  });
}
