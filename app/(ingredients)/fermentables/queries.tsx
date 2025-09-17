"use cache";
import { prisma } from "@/lib/client";

export async function getFermentables() {
  const fermentables = await prisma.fermentable.findMany();
  return fermentables;
}

export async function getFermentable(slug: string) {
  const fermentable = await prisma.fermentable.findFirst({ where: { slug } });
  return fermentable;
}
