"use server";

import { prisma } from "@/lib/client";
import { cache } from "react";

export const getFermentables = cache(async () => {
  const fermentables = await prisma.fermentable.findMany();
  return fermentables;
});

export const getFermentableOptions = async () => {
  const fermentables = await getFermentables();
  const options = fermentables.reduce((acc, fermentable) => {
    acc[fermentable.id] = fermentable.name;
    return acc;
  }, {} as Record<number, string>);
  return options;
};
