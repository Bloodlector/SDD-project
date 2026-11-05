import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";

const connectionString =
  process.env.DATABASE_URL || "postgresql://app:app@localhost:5432/app";

const adapter = new PrismaPg({ connectionString });
export const prisma = new PrismaClient({ adapter });
