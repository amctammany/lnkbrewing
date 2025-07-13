"use server";

import { prisma } from "@/lib/client";
import { cache } from "react";

export const getStyle = cache(async (slug: string) => {
  const style = await prisma.style.findFirst({
    where: { slug },
  });
  return style;
});
export const getStyles = cache(async () => {
  const styles = await prisma.style.findMany({
    orderBy: [{ subcategoryId: "asc" }, { identifier: "asc" }],
  });
  return styles;
});
