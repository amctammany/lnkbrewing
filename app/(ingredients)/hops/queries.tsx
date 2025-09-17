import { prisma } from "@/lib/client";

export async function getHops() {
  const fermentables = await prisma.hop.findMany();
  return fermentables;
}
