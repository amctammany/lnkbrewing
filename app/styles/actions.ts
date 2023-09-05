"use server";
import { prisma } from "@/lib/client";
import { parseStrings } from "@/lib/utils";
import { redirect } from "next/navigation";

export async function update(data: FormData) {
  const id = parseInt((data.get("_id") as string) || "");
  const strings = parseStrings(
    data,
    "name",
    "aroma",
    "appearance",
    "flavor",
    "mouthfeel",
    "history",
    "ingredients",
    "comments",
    "comparison",
    "examples"
  );
  const res = await prisma.style.update({
    where: {
      id,
    },
    data: {
      ...strings,
    },
  });
  redirect(`/styles/${res.identifier}`);
}
