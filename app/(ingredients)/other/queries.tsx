import { prisma } from "@/lib/client";

export async function getOtherIngredient(slug: string) {
  const other = await prisma.otherIngredient.findFirst({ where: { slug } });
  return other;
}

export async function getOtherIngredients() {
  const others = await prisma.otherIngredient.findMany();
  return others;
}
