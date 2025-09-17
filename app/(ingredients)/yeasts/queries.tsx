"use cache";
import { prisma } from "@/lib/client";

export async function getYeast(slug: string) {
  const yeast = await prisma.yeast.findFirst({ where: { slug } });
  return yeast;
}

export async function getYeasts() {
  const yeasts = await prisma.yeast.findMany();
  return yeasts;
}
