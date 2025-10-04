import { prisma } from "@/lib/client";
import { FermentableType } from "@/types/Ingredient";

export async function getFermentables() {
  const fermentables = await prisma.fermentable.findMany();
  return fermentables as FermentableType[];
}

export async function getFermentable(slug: string) {
  const fermentable = await prisma.fermentable.findFirst({ where: { slug } });
  return fermentable as FermentableType;
}
