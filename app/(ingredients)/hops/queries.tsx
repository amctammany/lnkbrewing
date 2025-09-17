"use cache";
import { prisma } from "@/lib/client";

export async function getHop(slug: string) {
  const hop = await prisma.hop.findFirst({ where: { slug } });
  return hop;
}

export async function getHops() {
  const hops = await prisma.hop.findMany();
  return hops;
}
