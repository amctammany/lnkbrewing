import { prisma } from "@/lib/client";

export async function getFermentables() {
  const fermentables = await prisma.fermentable.findMany();
  return fermentables;
}
