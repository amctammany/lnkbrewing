import { PrismaClient } from "@prisma/client";
import { PrismaClient as PrismaClientEdge } from "@prisma/client/edge";
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  process.env.NODE_ENV === "production"
    ? new PrismaClientEdge()
    : globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
