"use cache";
import { prisma } from "@/lib/client";
import { YeastType } from "@/types/Ingredient";

export async function getYeast(slug: string) {
  const yeast = await prisma.yeast.findFirst({ where: { slug } });
  return yeast as YeastType;
}

export async function getYeasts() {
  const yeasts = await prisma.yeast.findMany();
  return yeasts as YeastType[];
}
